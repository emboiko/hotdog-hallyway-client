import axios from "axios"
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { types } from "mobx-state-tree"

const User = types
  .model("User", {
    username: types.optional(types.string, ""),
    discordUsername: types.optional(types.string, ""),
    id: types.optional(types.string, ""),
  })

const AuthStore = types
  .model('AuthStore', {
    user: types.optional(User, {}),
    username: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    discordUsername: types.optional(types.string, ""),
    loginError: types.optional(types.string, ""),
    signupError: types.optional(types.string, "")
  })
  .actions(self => {
    return {
      async autoLogin(token) {
        let result
        try {
          result = await axios.get(`${process.env.BACKEND_URL}/users/me`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          self.unsetUser()
        }
        if (result?.status === 200) {
          self.setUser(result.data, token)
        }
      },
      async login(payload) {
        self.setLoginError("")
        let result
        try {
          result = await axios.post(`${process.env.BACKEND_URL}/users/login`, payload)
        } catch (error) {
          const errorMessage = error.response.data.error || "Unable to login."
          console.error(errorMessage)
          self.setLoginError(errorMessage)
        }
        if (result?.status === 200) {
          self.setUser(result.data.user, result.data.token)
          return true
        }
        return false
      },
      async signup(payload) {
        self.setSignupError("")
        let result
        try {
          result = await axios.post(`${process.env.BACKEND_URL}/users`, payload)
        } catch (error) {
          const errorMessage = error.response.data.error || "Unable to login."
          console.error(errorMessage)
          self.setSignupError(errorMessage)
        }

        if (result?.status === 201) {
          self.setUser(result.data.user, result.data.token)
          return true
        }
        return false
      },
      async logout() {
        let result
        const token = parseCookies(null).token
        try {
          result = await axios.post(`${process.env.BACKEND_URL}/users/logout`, {}, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          console.error(error)
        }
        if (result?.status === 200) {
          self.unsetUser()
          return true
        }
        return false
      },
      setUser(user, token) {
        self.user = {username: user.username, discordUsername: user.discordUsername, id:user._id}
        setCookie(null, 'token', token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
      },
      unsetUser() {
        self.user = {}
        self.setUsername("")
        self.setPassword("")
        self.setDiscordUsername("")
        destroyCookie(null, 'token', {path: '/'})
      },
      setUsername(value) {
        self.username = value
      },
      setDiscordUsername(value) {
        self.discordUsername = value
      },
      setPassword(value) {
        self.password = value
      },
      setLoginError(value) {
        self.loginError = value
      },
      setSignupError(value) {
        self.signupError = value
      }
    }
  })
  .views(self => ({
    get isLoggedIn() {
      return !!(self.user && self.user.id && self.user.id.length)
    }
  }))

export default AuthStore
