/**
 * By default, React Router will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://reactrouter.com/explanation/special-files#entryservertsx
 */

import { PassThrough } from 'node:stream'

import type {
  ActionFunctionArgs,
  AppLoadContext,
  EntryContext,
  LoaderFunctionArgs,
} from 'react-router'
import { createReadableStreamFromReadable } from '@react-router/node'
import { ServerRouter } from 'react-router'
import { isbot } from 'isbot'
import type { RenderToPipeableStreamOptions } from 'react-dom/server'
import { renderToPipeableStream } from 'react-dom/server'
// import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from './providers/MuiThemeProvider/createEmotionCache'
// import { CacheProvider } from '@emotion/react'
// import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import { darkTheme } from './providers/MuiThemeProvider/theme'
import { ThemeProvider } from '@mui/material'
// import createCache from '@emotion/cache'

export const streamTimeout = 5_000
console.log('creating Emotion cache...')

export function handleDataRequest(
  response: Response,
  { request, params, context }: LoaderFunctionArgs | ActionFunctionArgs
) {
  return response
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  // material-ui cached styles without streaming
  // const cache = createEmotionCache()
  // const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  //   createEmotionServer(cache)

  // const html = renderToString(
  //   <CacheProvider value={cache}>
  //     <ThemeProvider theme={darkTheme}>
  //       <ServerRouter context={routerContext} url={request.url} />
  //     </ThemeProvider>
  //   </CacheProvider>
  // )

  // const emotionChunks = extractCriticalToChunks(html)
  // const styles = constructStyleTagsFromChunks(emotionChunks)

  // const finalHtml = html.replace(
  //   `<meta name="emotion-insertion-point" content=""/>`,
  //   `<meta name="emotion-insertion-point" content=""/>${styles}`
  // )

  // responseHeaders.set('Content-Type', 'text/html')
  // return new Response(finalHtml, {
  //   status: responseStatusCode,
  //   headers: responseHeaders,
  // })
  // return new Promise((resolve, reject) => {
  //   let shellRendered = false
  //   const userAgent = request.headers.get('user-agent')
  //   const cache = createEmotionCache()
  //   const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  //     createEmotionServer(cache)

  //   // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
  //   // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
  //   const readyOption: keyof RenderToPipeableStreamOptions =
  //     (userAgent && isbot(userAgent)) || routerContext.isSpaMode
  //       ? 'onAllReady'
  //       : 'onShellReady'

  //   let html = ''
  //   const { pipe, abort } = renderToPipeableStream(
  //     <CacheProvider value={cache}>
  //       <ThemeProvider theme={darkTheme}>
  //         <ServerRouter context={routerContext} url={request.url} />
  //       </ThemeProvider>
  //     </CacheProvider>,
  //     {
  //       [readyOption]() {
  //         shellRendered = true
  //         const body = new PassThrough()

  //         // Collect stream output
  //         body.on('data', (chunk) => {
  //           html += chunk.toString()
  //         })

  //         body.on('end', () => {
  //           const chunks = extractCriticalToChunks(html)
  //           const styles = constructStyleTagsFromChunks(chunks)
  //           // const emotionChunks = extractCriticalToChunks(html)
  //           // const emotionStyleTags = constructStyleTagsFromChunks(emotionChunks)
  //           const finalHtml = html.replace(
  //             `<meta name="emotion-insertion-point" content=""/>`,
  //             `<meta name="emotion-insertion-point" content=""/>${styles}`
  //           )

  //           responseHeaders.set('Content-Type', 'text/html')
  //           resolve(
  //             new Response(finalHtml, {
  //               status: responseStatusCode,
  //               headers: responseHeaders,
  //             })
  //           )
  //         })

  //         pipe(body)
  //       },
  //       onShellError(error: unknown) {
  //         reject(error)
  //       },
  //       onError(error: unknown) {
  //         responseStatusCode = 500
  //         // Log streaming rendering errors from inside the shell.  Don't log
  //         // errors encountered during initial shell rendering since they'll
  //         // reject and get logged in handleDocumentRequest.
  //         if (shellRendered) {
  //           console.error(error)
  //         }
  //       },
  //     }
  //   )

  //   // Abort the rendering stream after the `streamTimeout` so it has time to
  //   // flush down the rejected boundaries
  //   setTimeout(abort, streamTimeout + 1000)
  // })

  return new Promise((resolve, reject) => {
    let shellRendered = false
    const userAgent = request.headers.get('user-agent')

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? 'onAllReady'
        : 'onShellReady'

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [readyOption]() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error)
          }
        },
      }
    )

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    setTimeout(abort, streamTimeout + 1000)
  })
}
