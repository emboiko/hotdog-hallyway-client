import React from "react"
import Head from "next/head"
import Landing from "~/components/Pages/Landing"
import StandardPage from "~/components/StandardPage"

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway</title>
      </Head>
      <StandardPage>
        <Landing />
      </StandardPage>
    </>
  )
}

export default LandingPage
