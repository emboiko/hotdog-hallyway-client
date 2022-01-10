const webpack = require('webpack')

if (process.env.NODE_ENV === "development") {
  module.exports = {
    webpack(config) {
          const { parsed: myEnv } = require('dotenv').config()
          config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
          return config
      }
  }
}
