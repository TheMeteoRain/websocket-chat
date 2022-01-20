import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { ChannelDrawer } from '@src/components'
import { ChannelContainer } from '@src/containers/ChannelContainer'
import { useSocial } from '@src/contexts/SocialContext'
import { useChannelsByMemberIdQuery } from '@src/graphql/queries/channelsByMemberId.generated'
import {
  ChannelDocument,
  ChannelSubscription,
  ChannelSubscriptionVariables,
} from '@src/graphql/subscriptions/channel.generated'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(10),
    },
  })
)

export interface HomeProps extends RouteComponentProps {}

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles()
  const { path, url } = useRouteMatch()

  const { current_member } = useSocial()
  const { data, loading, subscribeToMore } = useChannelsByMemberIdQuery({
    variables: { id: current_member.id },
  })

  React.useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore<ChannelSubscription, ChannelSubscriptionVariables>({
        document: ChannelDocument,
        variables: { id: current_member.id },
        updateQuery: (prev, { subscriptionData }) => {
          return {
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
        },
      })
    }
  }, [current_member.id, subscribeToMore])

  const channels = React.useMemo(() => {
    if (!data) return []
    return data.memberById.channelMembersByMemberId.nodes.map(
      (node): Channel => {
        return {
          id: node.channelId,
          nodeId: node.nodeId,
          messages: node.channelByChannelId.messagesByChannelId.nodes.map(
            ({ id, nodeId, memberId, text }) => ({
              id,
              nodeId,
              authorId: memberId,
              text,
            })
          ),
          members: node.channelByChannelId.channelMembersByChannelId.nodes.map(
            ({ memberByMemberId: { firstName, lastName, id, nodeId } }) => ({
              id,
              nodeId,
              firstName,
              lastName,
            })
          ),
        }
      }
    )
  }, [data])

  return (
    <div className={classes.root}>
      <ChannelDrawer channels={channels} myUser={current_member} />

      <main className={classes.content}>
        <Switch>
          <Route exact path={path}></Route>
          <Route path={`${path}/:channelId/messages`}>
            <ChannelContainer />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default Home
