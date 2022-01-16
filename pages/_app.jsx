import Head from "next/head"
import store from "~/stores/AppStore"
import { Provider } from "mobx-react"
import { observer } from "mobx-react"
import { useEffect } from "react"
import { parseCookies } from "nookies"
import { UI_SIZES } from "~/utilities/constants.js"

require("~/style/globalStyle.css")

const App = observer(({ Component, pageProps }) => {
  useEffect(async () => {
    const token = parseCookies(null).token
    if (token) {
      await store.auth.autoLogin(token)
    }
  })

  useEffect(() => {
    store.ui.setInnerWidth(window.innerWidth)
    store.ui.setInnerHeight(window.innerHeight)
    
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
  })

  return (
    <>
      <Head>
        <link rel="icon" href={"/static/favicon.ico"} type="image/x-icon" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
})

export default App
