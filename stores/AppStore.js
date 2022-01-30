import { types } from 'mobx-state-tree'
import UIStore from './uiStore'
import AuthStore from './authStore'
import ApplicationStore from './applicationStore'
import UtilityStore from './utilityStore'

const AppStore = types.model("AppStore", {
    ui: types.optional(UIStore, {}),
    auth: types.optional(AuthStore, {}),
    applications: types.optional(ApplicationStore, {}),
    utility: types.optional(UtilityStore, {}),
})

const store = AppStore.create({
  ui: {},
  auth: {},
  applications: {},
  utility: {},
})

export default store
