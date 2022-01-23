import axios from "axios"
import { types } from "mobx-state-tree"

const UIStore = types
  .model("UtilityStore", {
    discordLink: ""
  })
  .actions(self => {
    return {
      async getDiscordLink() {
        let response
        try {
          response = await axios.get(`${process.env.BACKEND_URL}/utility/discordInviteCode`)
        } catch (error) {
          console.error("Failed to fetch Discord invite code", error)
        }
        if (response?.status === 200) {
          self.setDiscordLink(response.data.code)
        }
      },
      setDiscordLink(code) {
        self.discordLink = `https://discord.gg/${code}`
      }
    }
  })

export default UIStore
