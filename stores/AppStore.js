import { types } from 'mobx-state-tree'
import { UIStore } from './uiStore'

const AppStore = types.model("AppStore", {
    ui: types.optional(UIStore, {}),
})

const store = AppStore.create({
  ui: {},
})

export default store