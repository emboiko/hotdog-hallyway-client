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
    window.addEventListener("resize", (e) => {
      store.ui.setInnerWidth(e.target.innerWidth)
      store.ui.setInnerHeight(e.target.innerHeight)

      if (e.target.innerWidth <= UI_SIZES.tiny) {
        store.ui.setIsTiny(true)
      } else {
        store.ui.setIsTiny(false)
      }
      
      if (e.target.innerWidth <= UI_SIZES.mobile) {
        store.ui.setIsSmall(true)
      } else {
        store.ui.setIsSmall(false)
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
