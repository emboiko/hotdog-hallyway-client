import { types } from 'mobx-state-tree'

const UIStore = types
  .model('UIStore', {
    loginModalShowing: false,
    signupModalShowing: false,
  })
  .actions(self => {
    return {
      setLoginModalShowing(loginModalShowing) {
        if (self.signupModalShowing) self.setSignupModalShowing(false)
        self.loginModalShowing = loginModalShowing
      },
      setSignupModalShowing(signupModalShowing) {
        if (self.loginModalShowing) self.setLoginModalShowing(false)
        self.signupModalShowing = signupModalShowing
      }
    }
  })
  .views(self => ({
    // get someProperty() {
    //   return someComputedStuff
    // }
  }))

export default UIStore
