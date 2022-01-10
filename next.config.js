// if (process.env.NODE_ENV === "development") {
//   const webpack = require('webpack')
//   module.exports = {
//     webpack(config) {
//           const { parsed: env } = require('dotenv').config()
//           config.plugins.push(new webpack.EnvironmentPlugin(env))
//           return config
//       }
//   }
// } else {
  // require("dotenv").config()
  const Dotenv = require("dotenv-webpack")
  // const path = require("path")
  module.exports = {
    webpack(config) {
      config.plugins.push(new Dotenv({ systemvars: true }))
      return config
    }
  }
// }
