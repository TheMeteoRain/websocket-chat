import { Outlet, redirect } from 'react-router'
import { VerifyAuthenticationDocument } from '../graphql/queries/verifyAuthentication.generated'
import {
  newApolloClientSSR,
  newApolloClientSSRServer,
} from '../providers/ApolloClientProvider/apolloClient'
import getCookieValue from '../utils/getCookieValue'
import type { Route } from './+types/protected'
import {
  VerifyAuthenticationQuery,
  VerifyAuthenticationQueryVariables,
} from '@rally/types/graphql'
import { UnprotectedAppBar } from '../containers/AppBar'
import React from 'react'

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('cookie') || ''
  const authorization = getCookieValue(cookieHeader, 'token')

  if (!authorization) {
    return
  }

  const { data } = await newApolloClientSSR(request).query<
    VerifyAuthenticationQuery,
    VerifyAuthenticationQueryVariables
  >({
    query: VerifyAuthenticationDocument,
    variables: {
      token: authorization,
    },
    fetchPolicy: 'no-cache',
  })

  if (data.verifyAuthentication) {
    return redirect('/channel')
  }

  return
}

export default function UnprotectedLayout() {
  return (
    <React.Fragment>
      <UnprotectedAppBar />
      <Outlet />
    </React.Fragment>
  )
}
