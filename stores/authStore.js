import axios from "axios"
import { types } from "mobx-state-tree"

const User = types
  .model("User", {
    characterName: types.optional(types.string, ""),
    discordUsername: types.optional(types.string, ""),
  })
  .actions(self => {
    return {
      setCharacterName(characterName) {
        self.characterName = characterName
      },
      setDiscordUsername(discordUsername) {
        self.discordUsername = discordUsername
      },
    }
  })

const AuthStore = types
  .model('AuthStore', {
    user: types.optional(User, {}),
    characterName: types.optional(types.string, ""),
    discordUsername: types.optional(types.string, "")
  })
  .actions(self => {
    return {
      async login(payload) {
        let result
        try {
          result = await axios.post(`${process.env.BACKEND_URL}/users/login`, payload)
        } catch (err) {
          console.error(err)
        }

        if (result.data && result.data.token) {
          self.setUser(result.data.user)
        }
      },
      async signup(payload) {
        let result
        try {
          result = await axios.post(`${process.env.BACKEND_URL}/users`, payload)
        } catch (err) {
          console.error(err)
        }

        if (result.data && result.data.token) {
          self.setUser(result.data.user)
        }
      },
      logout() {
        // Todo
      },
      setUser(user) {
        self.user = {characterName: user.characterName, discordUsername: user.discordUsername}
        self.user.setCharacterName(user.characterName)
        console.log(self.user)
      },
      unsetUser() {
        self.user = {}
      },
      setCharacterName(value) {
        self.characterName = value
      },
      setDiscordUsername(value) {
        self.discordUsername = value
      },
      setPassword(value) {
        self.password = value
      }
    }
  })
  .views(self => ({
    get isUserLoggedIn() {
        // Todo
    }
  }))

export default AuthStore
