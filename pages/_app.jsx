import Head from "next/head"
import store from "~/stores/AppStore"
import { Provider } from "mobx-react"
import { observer } from "mobx-react"
import { useEffect } from "react"
import { parseCookies } from "nookies"
import { UI_SIZES } from "~/utilities/constants.js"

require("~/style/globalStyle.css")

const App = observer(({ Component, pageProps }) => {
  store.auth.setLoaded(false)
  store.utility.getDiscordLink()

  useEffect(async () => {
    const token = parseCookies(null).token
    if (token) {
      await store.auth.autoLogin(token)
    }
    store.auth.setLoaded(true)
  }, [])

  useEffect(() => {
    store.ui.setInnerWidth(window.innerWidth)
    store.ui.setInnerHeight(window.innerHeight)
    
    store.ui.setIsTiny(window.innerWidth <= UI_SIZES.tiny)
    store.ui.setIsSmall(window.innerWidth <= UI_SIZES.small)
    store.ui.setIsMedium(window.innerWidth <= UI_SIZES.medium)
    
    window.addEventListener("resize", (e) => {
      store.ui.setInnerWidth(e.target.innerWidth)
      store.ui.setInnerHeight(e.target.innerHeight)

      if (e.target.innerWidth <= UI_SIZES.tiny) {
        store.ui.setIsTiny(true)
      } else {
        store.ui.setIsTiny(false)
      }
      
      if (e.target.innerWidth <= UI_SIZES.small) {
        store.ui.setIsSmall(true)
      } else {
        store.ui.setIsSmall(false)
      }

      if (e.target.innerWidth <= UI_SIZES.medium) {
        store.ui.setIsMedium(true)
      } else {
        store.ui.setIsMedium(false)
      }
    })
  }, [])

  useEffect(() => {
    console.log(store.auth.user.accountMissingInfo)
    if (store.auth.loaded && store.auth.isLoggedIn && store.auth.user.accountMissingInfo) {
      store.ui.setAccountMissingInfoModalShowing(true)
    }
  }, [store.auth.loaded, store.auth.isLoggedIn])

  return (
    <>
      <Head>
        <link rel="icon" href={"/static/favicon.ico"} type="image/x-icon" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Hotdog Hallway Mankrik TBC Raiding Guild" />
        <meta name="keywords" content="Hotdog, Hallway, Hotdog-Hallway, Mankrik TBC, Hotdog Hallway Guild" />
        <meta name="author" content="Emboiko" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
})

export default App
