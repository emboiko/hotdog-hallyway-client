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
    guildMemberLevel: types.optional(types.number, 0),
    applicationID: types.optional(types.string, ""),
    avatar: types.optional(types.string, ""),
    race: types.optional(types.string, ""),
    className: types.optional(types.string, ""),
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
      setRace(race) {
        self.race = race
      },
      setClassName(className) {
        self.className = className
      },
      setSpecialization(specialization) {
        self.specialization = specialization
      },
      async updateUser(payload) {
        const token = parseCookies(null).token

        // Peel the avatar off the payload if we have one
        const avatar = payload.avatar
        delete payload.avatar

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

        // Fields from account page:
        if (payload.username) self.setUsername(payload.username)
        if (payload.discordUsername) self.setDiscordUsername(payload.DiscordUsername)
        if (payload.race) self.setRace(payload.race)
        if (payload.className) self.setClassName(payload.className)
        if (payload.specialization) self.setSpecialization(payload.specialization)

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
    },
    get accountMissingInfo() {
      if ((self.guildMemberLevel > 0) && (!self.className || !self.race || !self.specialization)) return true
      return false
    },
    get isGuildMember() {
      return self.guildMemberLevel > 0
    },
    get isCouncilMember() {
      return self.guildMemberLevel === 3
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
      async changeUserRank(userID, action) {
        const token = parseCookies(null).token
        let result
        try {
          result = await axios.post(`${process.env.BACKEND_URL}/users/${userID}/rank`, {action}, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          console.error(error)
          return false
        }
        if (result.status === 200) return true
        return false
      },
      async deleteUser(userID) {
        const token = parseCookies(null).token
        try {
          await axios.delete(`${process.env.BACKEND_URL}/users/${userID}`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          console.error(error)
          return false
        }
        return true
      },
      async deleteUserAvatar(userID) {
        const token = parseCookies(null).token
        let result
        try {
          result = await axios.delete(`${process.env.BACKEND_URL}/users/${userID}/avatar`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          console.error(error)
          return false
        }
        if (result.status === 200) return true
        return false
      },
      async getAllUsers() {
        const token = parseCookies(null).token
        let result
        try {
          result = await axios.get(`${process.env.BACKEND_URL}/users/all`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          console.error(error)
          return {error: "Server error"}
        }

        if (result.status === 200) {
          const allGuildMembers = result.data.users.sort((a,b) => a.username.localeCompare(b.username))
          const guildCouncilMembers = []
          const guildRaiderMembers = []
          const guildRegularMembers = []
          const guildNonMembers = []
  
          allGuildMembers.forEach((member) => {
            if (member.guildMemberLevel === 3) guildCouncilMembers.push(member)
            if (member.guildMemberLevel === 2) guildRaiderMembers.push(member)
            if (member.guildMemberLevel === 1) guildRegularMembers.push(member)
            if (member.guildMemberLevel === 0) guildNonMembers.push(member)
          })
  
          return {guildCouncilMembers, guildRaiderMembers, guildRegularMembers, guildNonMembers}
        }

      },
      async autoLogin() {
        self.setLoaded(false)

        const token = parseCookies(null).token
        if (token) {
          let result
          try {
            result = await axios.get(`${process.env.BACKEND_URL}/users/me`, {headers: {Authorization: `Bearer ${token}`}})
          } catch (error) {
            self.unsetUser()
          }
          if (result?.status === 200) {
            self.setUser(result.data.user, token)
          }
        }

        self.setLoaded(true)
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
          id: user._id,
          guildMemberLevel: user.guildMemberLevel,
          avatar: user.avatar,
          ...(user.applicationID && {applicationID: user.applicationID}),
          ...(user.race && {race: user.race}),
          ...(user.className && {className: user.className}),
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
