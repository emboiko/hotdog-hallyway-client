import Head from "next/head"
import store from "~/stores/AppStore"
import { Provider } from "mobx-react"
import { observer } from "mobx-react"

require("~/style/globalStyle.css")

const MyApp = observer(({ Component, pageProps }) => {
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

export default MyApp
