import { types } from 'mobx-state-tree'
import UIStore from './uiStore'
import AuthStore from './authStore'
import UtilityStore from './utilityStore'

const AppStore = types.model("AppStore", {
    ui: types.optional(UIStore, {}),
    auth: types.optional(AuthStore, {}),
    utility: types.optional(UtilityStore, {}),
})

const store = AppStore.create({
  ui: {},
  auth: {},
  utility: {},
})

export default store