import axios from "axios"
import { parseCookies } from 'nookies'
import { types } from "mobx-state-tree"

const ApplicationStore = types
  .model("ApplicationStore", {
    applicationSubmissionError: types.optional(types.string, ""),
  })
  .actions(self => {
    return {
      async submitApplication(payload) {
        const token = parseCookies(null).token
        let result

        try {
          result = await axios.post(`${process.env.BACKEND_URL}/applications`, payload, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          let errorMessage = ""
          if (error.response.status === 400 || error.response.status === 500) {
            errorMessage = error.response.data.error
          } else {
            errorMessage = "Unable to submit application."
          }

          self.setApplicationSubmissionError(errorMessage)
          return false
        }

        if (result.status == 201) {
          return result.data.applicationID
        }
      },
      async getApplicationStatus() {
        const token = parseCookies(null).token
        let result

        try {
          result = await axios.get(`${process.env.BACKEND_URL}/applications/mine/status`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          let errorMessage = ""
          if (error.response.status === 404 || error.response.status === 500) {
            errorMessage = error.response.data.error
          } else {
            errorMessage = "Unable to get application status."
          }
          console.error(errorMessage)
          return false
        }

        if (result.status === 200) return result.data.status
      },
      async getAllApplications() {
        const token = parseCookies(null).token
        let result

        try {
          result = await axios.get(`${process.env.BACKEND_URL}/applications/all`, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
          let errorMessage = ""
          if (error.response.status === 500) {
            errorMessage = error.response.data.error
          } else {
            errorMessage = "Unable to get all applications"
          }
          console.error(errorMessage)
          return []
        }
        
        if (result.status === 200) return result.data.applications
      }
    }
  })

export default ApplicationStore
