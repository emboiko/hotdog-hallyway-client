import { types } from "mobx-state-tree"

const UIStore = types
  .model("UIStore", {
    loginModalShowing: false,
    signupModalShowing: false,
    accountMissingInfoModalShowing: false,
    nonMemberModalShowing: false,
    isTiny: false,
    isSmall: false,
    isMedium: false,
    innerWidth: 0,
    innerHeight: 0
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
      },
      setAccountMissingInfoModalShowing(accountMissingInfoModalShowing) {
        self.accountMissingInfoModalShowing = accountMissingInfoModalShowing
      },
      setNonMemberModalShowing(nonMemberModalShowing) {
        self.nonMemberModalShowing = nonMemberModalShowing
      },
      setIsTiny(bool) {
        self.isTiny = bool
      },
      setIsSmall(bool) {
        self.isSmall = bool
      },
      setIsMedium(bool) {
        self.isMedium = bool
      },
      setInnerWidth(num) {
        self.innerWidth = num
      },
      setInnerHeight(num) {
        self.innerHeight = num
      }
    }
  })
  .views(self => ({
    // get someProperty() {
    //   return someComputedStuff
    // }
  }))

export default UIStore
