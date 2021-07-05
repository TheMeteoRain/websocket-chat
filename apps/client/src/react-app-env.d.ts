/// <reference types="react-scripts" />
/// <reference types="react-router" />

interface RouteComponentParamProps {
  channelId?: string
}

declare interface RouteComponentProps
  extends import('react-router')
    .RouteComponentProps<RouteComponentParamProps> {}

declare interface RouteProps
  extends import('react-router').RouteProps<string, RouteComponentParamProps> {}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
    readonly API_PORT: number
    readonly API_HOST: string
    readonly API_ENDPOINT: string
  }
}
