import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import Application from "~/components/Pages/Application"
import withRequiredLoggedInUser from "~/components/HOCs/withRequiredLoggedInUser"

const ApplicationPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway | Apply</title>
      </Head>
      <StandardPage>
        <Application />
      </StandardPage>
    </>
  )
}

export default withRequiredLoggedInUser(ApplicationPage)
