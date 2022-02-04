import axios from "axios"
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { types } from "mobx-state-tree"
import Router from "next/router"

const User = types
  .model("User", {
    username: types.optional(types.string, ""),
    discordUsername: types.optional(types.string, ""),
    id: types.optional(types.string, ""),
    accountUpdateError: types.optional(types.string, ""),
    isGuildMember: types.optional(types.boolean, false),
    isCouncilMember: types.optional(types.boolean, false),
    applicationID: types.optional(types.string, ""),
    avatar: types.optional(types.string, ""),
    race: types.optional(types.string, ""),
    class: types.optional(types.string, ""),
    specialization: types.optional(types.string, ""),
  })
  .actions(self => {
    return {
      setUsername(username) {
        self.username = username
      },
      setDiscordUsername(discordUsername) {
        self.discordUsername = discordUsername
      },
      setAccountUpdateError(error) {
        self.accountUpdateError = error
      },
      setApplicationSubmissionError(error) {
        self.applicationSubmissionError = error
      },
      setApplicationID(applicationID) {
        self.applicationID = applicationID
      },
      setAvatar(base64ImageData) {
        self.avatar = base64ImageData
      },
      async updateUser(payload) {
        const token = parseCookies(null).token

        try {
          await axios.patch(`${process.env.BACKEND_URL}/users/me`, payload, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          let errorMessage = ""
          if (error.response.status === 400 || error.response.status === 500) {
            errorMessage = error.response.data.error
          } else {
            errorMessage = "Unable to update update account info."
          }
          
          self.setAccountUpdateError(errorMessage)
          return false
        }

        const avatar = payload.avatar
        delete payload.avatar

        if (avatar) {
          const formData = new FormData()
          formData.append("avatar", avatar)

          let avatarResult
          try {
            const config = {
              headers: {Authorization: `Bearer ${token}`}, 
              "content-type": "multipart/form-data"
            }

            avatarResult = await axios.post(`${process.env.BACKEND_URL}/users/me/avatar`, formData, config)
          } catch (error) {
            let errorMessage = ""
            if (error.response.status === 400) {
              errorMessage = error.response.data.error
            } else {
              errorMessage = "Unable to update avatar data."
            }

            self.setAccountUpdateError(errorMessage)
            return false
          }
          self.setAvatar(avatarResult.data.imageData)
        }

        return true
      }
    }
  })
  .views(self => ({
    get avatarBlob() {
      if (self.avatar) {
        return "data:image/png;base64," + self.avatar
      }
      return ""
    }
  }))

const AuthStore = types
  .model('AuthStore', {
    user: types.optional(User, {}),
    username: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    discordUsername: types.optional(types.string, ""),
    loginError: types.optional(types.string, ""),
    signupError: types.optional(types.string, ""),
    navigationAttempt: types.optional(types.string, ""),
    loaded: types.optional(types.boolean, false),
  })
  .actions(self => {
    return {
      async getAllUsers() {
        const token = parseCookies(null).token
        let result
        try {
          result = await axios.get(`${process.env.BACKEND_URL}/users/all`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          return {error: "Server error"}
        }

        if (result.status === 200) {
          const allGuildMembers = result.data.users
          const guildCouncilMembers = []
          const guildRegularMembers = []
  
          allGuildMembers.forEach((member) => {
            if (member.isCouncilMember) guildCouncilMembers.push(member)
            else guildRegularMembers.push(member)
          })
  
          return {guildCouncilMembers, guildRegularMembers}
        }

      },
      async autoLogin(token) {
        let result
        try {
          result = await axios.get(`${process.env.BACKEND_URL}/users/me`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          self.unsetUser()
        }
        if (result?.status === 200) {
          self.setUser(result.data.user, token)
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
          if (self.navigationAttempt) {
            Router.push(self.navigationAttempt)
            self.setNavigationAttempt("")
          }
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
          if (self.navigationAttempt) {
            Router.push(self.navigationAttempt)
            self.setNavigationAttempt("")
          }
          return true
        }
        return false
      },
      async logout() {
        const token = parseCookies(null).token
        let result
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
        self.user = {
          username: user.username, 
          discordUsername: user.discordUsername, 
          id:user._id,
          isGuildMember:user.isGuildMember,
          isCouncilMember:user.isCouncilMember,
          avatar: user.avatar,
          ...(user.applicationID && {applicationID: user.applicationID}),
          ...(user.race && {race: user.race}),
          ...(user.class && {class: user.class}),
          ...(user.specialization && {specialization: user.specialization}),
        }

        setCookie(null, 'token', token, {maxAge: 30 * 24 * 60 * 60, path: '/'})
      },
      unsetUser() {
        self.user = {}
        self.setUsername("")
        self.setPassword("")
        self.setDiscordUsername("")
        destroyCookie(null, 'token', {path: '/'})
      },
      setUsername(username) {
        self.username = username
      },
      setDiscordUsername(discordUsername) {
        self.discordUsername = discordUsername
      },
      setPassword(password) {
        self.password = password
      },
      setLoginError(error) {
        self.loginError = error
      },
      setSignupError(error) {
        self.signupError = error
      },
      setNavigationAttempt(path) {
        self.navigationAttempt = path
      },
      setLoaded(bool) {
        self.loaded = bool
      }
    }
  })
  .views(self => ({
    get isLoggedIn() {
      return !!(self.user && self.user.id && self.user.id.length)
    }
  }))

export default AuthStore
