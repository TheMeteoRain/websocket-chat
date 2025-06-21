import createCache from '@emotion/cache'

export default function createEmotionCache() {
  const insertionPoint =
    typeof document !== 'undefined'
      ? document.querySelector('meta[name="emotion-insertion-point"]') ??
        undefined
      : undefined

  return createCache({ key: 'mui', insertionPoint })
}
