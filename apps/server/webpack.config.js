const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('path')
const webpack = require('webpack')

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: '@graphql-tools/webpack-loader',
        },
      },
    ],
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
    }),
  ],
}
