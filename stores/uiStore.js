import { types } from 'mobx-state-tree'

export const UIStore = types
  .model('UIStore', {
    loginModalShowing: false,
    signupModalShowing: false,
  })
  .actions(self => {
    return {
      setLoginModalShowing(loginModalShowing) {
        self.loginModalShowing = loginModalShowing
      },
      setSignupModalShowing(signupModalShowing) {
        self.signupModalShowing = signupModalShowing
      }
    }
  })
  .views(self => ({
    // get someProperty() {
    //   return someComputedStuff
    // }
  }))
