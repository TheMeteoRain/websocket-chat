/// <reference types='vitest' />
import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig(({ isSsrBuild }) => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/client',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    !process.env.VITEST && reactRouter(),
    process.env.NODE_ENV !== 'production' && devtoolsJson(),
  ],

  build: {
    outDir: './build',
    emptyOutDir: true,
    reportCompressedSize: true,
    // remove this if initiating nx start
    ssr: true,
    // remove this if initiating nx start
    rollupOptions: isSsrBuild
      ? {
          input: './server/app.ts',
        }
      : undefined,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
  optimizeDeps: {
    include: ['@apollo/client'],
  },
  ssr: {
    noExternal: [
      '@apollo/client',
      '@emotion/cache',
      '@emotion/react',
      '@emotion/server',
    ], // for SSR (e.g. SvelteKit, Nuxt, etc.)
    optimizeDeps: {
      include: ['@emotion/cache', '@emotion/react', '@emotion/server'],
    },
  },
}))
