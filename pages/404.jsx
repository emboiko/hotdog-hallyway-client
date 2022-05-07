import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import NotFound from "~/components/Pages/NotFound"

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway | Not Found</title>
      </Head>
      <StandardPage>
        <NotFound />
      </StandardPage>
    </>
  )
}

export default NotFoundPage
