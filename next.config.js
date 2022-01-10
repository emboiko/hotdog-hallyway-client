if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const path = require("path")
const Dotenv = require('dotenv-webpack');

const nextConfig = {
  webpack(config) {
    // Root alias for webpack
    config.resolve.alias["~"] = path.join(__dirname, "/")

    // Load system env vars for production
    config.plugins.push(new Dotenv({
      path: path.join(__dirname, ".env"),
      systemvars: true
    }))
    return config
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  }
}

module.exports = nextConfig
