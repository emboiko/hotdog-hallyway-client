import React from "react"
import { observer } from "mobx-react"
import { useRouter } from "next/router"
import useInject from "~/hooks/useInject"
import Landing from "~/components/Landing"
import StandardPage from "~/components/StandardPage"

const mapStore = store => ({
  loaded: store.auth.loaded,
  isLoggedIn: store.auth.isLoggedIn,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  setNavigationAttempt: store.auth.setNavigationAttempt
})

const withRequiredLoggedInUser = (Child) => observer((() => {
  const { loaded, isLoggedIn, setSignupModalShowing, setNavigationAttempt } = useInject(mapStore)
  const router = useRouter()

  if (isLoggedIn) return <Child/>

  if (loaded && !isLoggedIn) {
    setSignupModalShowing(true)
    setNavigationAttempt(router.pathname)
    return (
      <StandardPage>
        <Landing />
      </StandardPage>
    )
  }

  if (!loaded) return <></>
}))


export default withRequiredLoggedInUser
