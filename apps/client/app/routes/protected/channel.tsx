import { useReadQuery } from '@apollo/client'
import { styled } from '@mui/material/styles'
import { useLoaderData } from 'react-router'
import { ChannelDrawer } from '../../components/ChannelDrawer'
import { ChannelMembersDrawer } from '../../components/ChannelMembersDrawer'
import { ChannelContainer } from '../../containers/ChannelContainer'
import {
  CurrentMemberDocument,
  CurrentMemberQuery,
  CurrentMemberQueryVariables,
} from '../../graphql/queries/currentMember.generated'
import { useAuth } from '../../hooks/useAuth'
import useChannel from '../../hooks/useChannel'
import {
  apolloLoader,
  newApolloClientSSR,
} from '../../providers/ApolloClientProvider/apolloClient'
import type { Route } from './+types/channel'
import { ChannelsByMemberIdDocument } from '../../graphql/queries/channelsByMemberId.generated'
import {
  ChannelsByMemberIdQuery,
  ChannelsByMemberIdQueryVariables,
} from '@rally/types/graphql'

const Root = styled('div')({
  display: 'flex',
  height: 'calc(100vh - 66px)',
})

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
}))

// https://github.com/apollographql/apollo-client-integrations/issues/248
// https://github.com/apollographql/apollo-client-integrations/blob/next/packages/react-router/README.md
// export const loader = apolloLoader<Route.LoaderArgs>()(
//   async ({ preloadQuery }) => {
//     const currentMemberQuery = preloadQuery<
//       CurrentMemberQuery,
//       CurrentMemberQueryVariables
//     >(CurrentMemberDocument)

//   const channelsQuery = preloadQuery<ChannelsByMemberIdQuery, ChannelsByMemberIdQueryVariables>(ChannelsByMemberIdDocument,
//     {variables: {

//     }}
//   )

//     return { currentMemberQuery, channelsQuery }
//   }
// )

// export async function loader({ request }: Route.LoaderArgs) {
//   const apolloClient = newApolloClient(request)

//   const currentMemberResult = await apolloClient.query<CurrentMemberQuery>({
//     query: CurrentMemberDocument,
//     fetchPolicy: 'no-cache',
//   })

//   const channelsResult = await apolloClient.query<
//     ChannelsByMemberIdQuery,
//     ChannelsByMemberIdQueryVariables
//   >({
//     query: ChannelsByMemberIdDocument,
//     fetchPolicy: 'no-cache',
//     variables: {
//       memberId: currentMemberResult.data.currentMember?.id,
//     },
//   })

//   return { currentMemberResult, channelsResult }
// }
// export async function loader({ request }: Route.LoaderArgs) {
//   const { data } = await newApolloClient(request).query({
//     query: AuthenticateDocument,
//     variables: {
//       email: 'Mac.Terry19@gmail.com',
//       password: 'ako3ShfGH3asZV1',
//     },
//   })

//   if (!data?.authenticate) {
//     return redirect('/')
//   }

//   return { data: data.authenticate }
// }

// export async function loader(a: Route.LoaderArgs) {

//   const preloadQuery = createQueryPreloader(
//     newApolloClient(a.request)
//   )
//   return preloadQuery(AuthenticateDocument, {
//     variables: {
//       email: 'Mac.Terry19@gmail.com',
//       password: 'ako3ShfGH3asZV1',
//     },
//   })
// }

export default function Channel({ params, loaderData }: Route.ComponentProps) {
  // const { channelsResult, currentMemberResult } = loaderData
  // const {
  //   data: { currentMember },
  // } = currentMemberResult
  // const {
  //   data: { channelsByMemberId },
  // } = channelsResult
  // const { myQueryRef } = useLoaderData<typeof loader>()
  // const {
  //   data: { currentMember },
  // } = useReadQuery(myQueryRef)
  const { member: currentMember } = useAuth()
  const { data } = useChannel()
  const { channelId } = params

  return (
    <Root>
      <div style={{ display: 'flex', flex: '0 1 250px' }}>
        {!!data?.channelsByMemberId.length && !!currentMember && (
          <ChannelDrawer
            channels={data?.channelsByMemberId}
            myUser={currentMember}
          />
        )}
      </div>
      <Main>{channelId && <ChannelContainer channelId={channelId} />}</Main>
      <div style={{ display: 'flex', flex: '0 1 250px' }}>
        {!!data?.channelsByMemberId.length && !!currentMember && (
          <ChannelMembersDrawer
            channels={data?.channelsByMemberId}
            myUser={currentMember}
          />
        )}
      </div>
    </Root>
  )
}
