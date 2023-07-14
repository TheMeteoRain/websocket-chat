import { createStyles, makeStyles } from '@material-ui/core/styles'
import { ChannelDrawer } from '@src/components'
import { ChannelContainer } from '@src/containers/ChannelContainer'
import { useChannelsByMemberIdQuery } from '@src/graphql/queries/channelsByMemberId.generated'
import {
  ChannelDocument,
  ChannelSubscription,
  ChannelSubscriptionVariables,
} from '@src/graphql/subscriptions/channel.generated'
import { useAuth } from '@src/hooks/useAuth'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme) =>
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

export interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles()
  const { current_member } = useAuth()
  const { data, subscribeToMore } = useChannelsByMemberIdQuery({
    variables: { id: current_member?.id },
  })

  React.useEffect(() => {
    if (current_member?.id && subscribeToMore) {
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
  }, [current_member?.id, subscribeToMore])

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
        <Routes>
          <Route path={'/'} element={<div>CHANNEL</div>} />
          <Route path={'/:channelId/messages'} Component={ChannelContainer} />
        </Routes>
      </main>
    </div>
  )
}

export default Home
