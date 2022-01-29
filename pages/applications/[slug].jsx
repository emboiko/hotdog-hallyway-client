import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import SingleApplication from "~/components/Pages/Applications/SingleApplication"
import withRequiredLoggedInUser from "~/components/HOCs/withRequiredLoggedInUser"
import withRequiredCouncilMember from "~/components/HOCs/withRequiredCouncilMember"

const SingleApplicationPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway</title>
      </Head>
      <StandardPage>
        <SingleApplication />
      </StandardPage>
    </>
  )
}

export default withRequiredLoggedInUser(withRequiredCouncilMember(SingleApplicationPage))
