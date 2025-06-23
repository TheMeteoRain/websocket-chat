import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from '@react-router/dev/routes'

export default [
  layout('./routes/unprotected.tsx', [
    index('./routes/unprotected/login.tsx'),
    route('/register', './routes/unprotected/register.tsx'),
  ]),
  layout('./routes/protected.tsx', [
    route('channel/:channelId?/messages?', './routes/protected/channel.tsx'),
  ]),
  route('*', './routes/notfound.tsx'),
] satisfies RouteConfig
