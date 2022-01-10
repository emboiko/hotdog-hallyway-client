require("dotenv").config()
const path = require("path")
const Dotenv = require('dotenv-webpack');

console.log(process.env)
console.log("===============")
console.log("===============")
console.log("===============")
console.log(process.env.BACKEND_URL)
console.log("===============")
console.log("===============")
console.log("===============")


const nextConfig = {
  webpack(config) {
    // Root alias for webpack
    // config.resolve.alias["~"] = path.join(__dirname, "/")
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
