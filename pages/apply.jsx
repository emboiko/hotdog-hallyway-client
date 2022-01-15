import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import Application from "~/components/Application"

const ApplicationPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway</title>
      </Head>
      <StandardPage>
        <Application />
      </StandardPage>
    </>
  )
}

export default ApplicationPage
