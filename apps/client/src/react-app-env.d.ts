/// <reference types="react-scripts" />
/// <reference types="react-router" />

// interface RouteComponentParamProps {
//   channelId?: string
// }

// declare interface RouteComponentProps
//   extends import('react-router')
//     .RouteComponentProps<RouteComponentParamProps> {}

// declare interface RouteProps
//   extends import('react-router').RouteProps<string, RouteComponentParamProps> {}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
    readonly NX_API_SCHEME_HTTP: string
    readonly NX_API_SCHEME_WS: string
    readonly NX_API_HOST: string
    readonly NX_API_PORT: number
    readonly NX_API_ENDPOINT: string
  }
}
