import {
  CurrentMemberQuery,
  VerifyAuthenticationQuery,
} from '@rally/types/graphql'
import React from 'react'
import { Outlet, redirect } from 'react-router'
import { ProtectedAppBar } from '../containers/AppBar'
import { CurrentMemberDocument } from '../graphql/queries/currentMember.generated'
import { VerifyAuthenticationDocument } from '../graphql/queries/verifyAuthentication.generated'
import {
  newApolloClientSSR,
  newApolloClientSSRServer,
} from '../providers/ApolloClientProvider/apolloClient'
import getCookieValue from '../utils/getCookieValue'
import type { Route } from './+types/protected'

// https://github.com/apollographql/apollo-client-integrations/issues/248
// https://github.com/apollographql/apollo-client-integrations/blob/next/packages/react-router/README.md
// export const loader = apolloLoader<Route.LoaderArgs>()(async ({ preloadQuery }) => {
//   const myQueryRef = preloadQuery(AuthenticateDocument, {
//     variables: {
//       email: 'Mac.Terry19@gmail.com',
//       password: 'ako3ShfGH3asZV1',
//     },
//   })

//   return { myQueryRef }
// })
export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('cookie') || ''
  const authorization = getCookieValue(cookieHeader, 'token')

  if (!authorization) {
    return redirect('/')
  }

  const apolloClient = newApolloClientSSR(request)

  const { data } = await apolloClient.query<VerifyAuthenticationQuery>({
    query: VerifyAuthenticationDocument,
    variables: {
      token: authorization,
    },
    fetchPolicy: 'no-cache',
  })

  if (!data?.verifyAuthentication) {
    return redirect('/')
  }

  const { data: data1 } = await apolloClient.query<CurrentMemberQuery>({
    query: CurrentMemberDocument,
    fetchPolicy: 'no-cache',
  })

  return { token: authorization, member: data1.currentMember }
}

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

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
  const { token, member } = loaderData

  return (
    <React.Fragment>
      <ProtectedAppBar member={member} token={token} />
      <Outlet />
    </React.Fragment>
  )
}
