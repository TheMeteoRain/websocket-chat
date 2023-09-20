const { composePlugins, withNx } = require('@nx/webpack')
const { merge } = require('webpack-merge')

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
  })
})
