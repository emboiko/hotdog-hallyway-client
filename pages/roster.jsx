import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import Roster from "~/components/Roster"

const RosterPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway</title>
      </Head>
      <StandardPage>
        <Roster />
      </StandardPage>
    </>
  )
}

export default RosterPage
