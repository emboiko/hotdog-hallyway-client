import { types } from 'mobx-state-tree'
import UIStore from './uiStore'
import AuthStore from './authStore'

const AppStore = types.model("AppStore", {
    ui: types.optional(UIStore, {}),
    auth: types.optional(AuthStore, {}),
})

const store = AppStore.create({
  ui: {},
  auth: {},
})

export default store