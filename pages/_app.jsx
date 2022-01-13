import Head from "next/head"
import store from "~/stores/AppStore"
import { Provider } from "mobx-react"
import { observer } from "mobx-react"
import { useEffect } from "react"
import { parseCookies } from "nookies"

require("~/style/globalStyle.css")

const App = observer(({ Component, pageProps }) => {
  useEffect(async () => {
    const token = parseCookies(null).token
    if (token) {
      await store.auth.autoLogin(token)
    }
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
