import Head from "next/head"
require("~/style/globalStyle.css")

const MyApp = ({ Component, pageProps }) => {
  return <>
    <Head>
      <link rel="icon" href={"/static/favicon.ico"} type="image/x-icon" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
