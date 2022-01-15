import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React, { Suspense } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  Link,
} from 'react-router-dom'
import { ChannelDrawer } from '@src/components'
import {
  GraphqlHelpQuery,
  QueryMemberByIdData,
  useSocial,
  Channel,
} from '@src/contexts/SocialContext'
import { ChannelContainer } from '@src/containers/ChannelContainer'
import { gql, useQuery } from '@apollo/client'
import { ChannelSubscriptionPayload, MemberInput } from '@mete/types'

const drawerWidth = 240

const QUERY_CHANNELS_BY_USER_ID = gql`
  query QueryMemberById($id: UUID!) {
    memberById(id: $id) {
      channelMembersByMemberId {
        nodes {
          nodeId
          channelId
          channelByChannelId {
            messagesByChannelId(last: 50) {
              nodes {
                id
                nodeId
                memberId
                text
                createdAt
                updatedAt
              }
            }
            channelMembersByChannelId(
              filter: { memberId: { notEqualTo: $id } }
            ) {
              nodes {
                memberByMemberId {
                  firstName
                  lastName
                  id
                  nodeId
                }
              }
            }
          }
        }
      }
    }
  }
`

const CHANNEL_SUBSCRIPTION = gql`
  subscription ChannelSubscription($id: UUID!) {
    newChannel {
      event
      channel {
        channelMembersByChannelId(filter: { memberId: { notEqualTo: $id } }) {
          nodes {
            channelByChannelId {
              channelMembersByChannelId(
                filter: { memberId: { notEqualTo: $id } }
              ) {
                nodes {
                  nodeId
                  channelId
                  channelByChannelId {
                    messagesByChannelId(last: 50) {
                      nodes {
                        id
                        nodeId
                        memberId
                        text
                        createdAt
                        updatedAt
                      }
                    }
                    channelMembersByChannelId(
                      filter: { memberId: { notEqualTo: $id } }
                    ) {
                      nodes {
                        memberByMemberId {
                          firstName
                          lastName
                          id
                          nodeId
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const channelsByMemberIdToChannelObject = (
  data: QueryMemberByIdData
): Channel[] => {
  return data.memberById.channelMembersByMemberId.nodes.flatMap(
    (channelMember) => {
      const { channelId, channelByChannelId, nodeId } = channelMember

      return {
        id: channelId,
        nodeId,
        users: channelByChannelId.channelMembersByChannelId.nodes.flatMap(
          (channelMember) => channelMember.memberByMemberId
        ),
        messages: channelByChannelId.messagesByChannelId.nodes.flatMap(
          (message) => message
        ),
      }
    }
  )
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(8),
    },
  })
)

export interface HomeProps extends RouteComponentProps {}

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles()
  const { path, url } = useRouteMatch()

  const {
    current_member,
    channels = [],
    logout,
    getChannels,
    dispatch,
  } = useSocial()
  const { data, loading, subscribeToMore, called } = useQuery<
    QueryMemberByIdData,
    Required<Pick<MemberInput, 'id'>>
  >(QUERY_CHANNELS_BY_USER_ID, { variables: { id: current_member.id } })

  React.useLayoutEffect(() => {
    if (data?.memberById) {
      dispatch({
        type: 'UPDATE_CHANNELS',
        payload: {
          channels: channelsByMemberIdToChannelObject(data),
        },
      })
    }
  }, [data, dispatch])

  React.useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore<
        GraphqlHelpQuery<'newChannel', ChannelSubscriptionPayload>
      >({
        document: CHANNEL_SUBSCRIPTION,
        variables: { id: current_member.id },
        updateQuery: (prev, { subscriptionData }) => {
          const next: QueryMemberByIdData = {
            ...prev,
            ...{
              memberById: {
                ...prev.memberById,
                channelMembersByMemberId: {
                  ...prev.memberById.channelMembersByMemberId,
                  nodes: [
                    ...prev.memberById.channelMembersByMemberId.nodes,
                    ...subscriptionData.data.newChannel.channel.channelMembersByChannelId.nodes.flatMap(
                      (node) =>
                        node.channelByChannelId.channelMembersByChannelId.nodes
                    ),
                  ],
                },
              },
            },
          }

          return next
        },
      })
    }
  }, [current_member.id, subscribeToMore])

  return (
    <div className={classes.root}>
      <ChannelDrawer channels={channels} myUser={current_member} />

      <main className={classes.content}>
        <Switch>
          <Route exact path={path}>
            <div>TYHJÄ</div>
          </Route>
          <Route path={`${path}/:channelId/messages`}>
            <ChannelContainer />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default Home
