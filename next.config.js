require("dotenv").config()

console.log(process.env)

const nextConfig = {
  // webpack(config) {
  //   // Root alias for webpack
  //   config.resolve.alias["~"] = path.join(__dirname, "/")
  //   return config
  // }
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  }
}

module.exports = nextConfig
