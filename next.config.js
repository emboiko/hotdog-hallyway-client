
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack')
  module.exports = {
    webpack(config) {
          const { parsed: env } = require('dotenv').config()
          config.plugins.push(new webpack.EnvironmentPlugin(env))
          return config
      }
  }
}
