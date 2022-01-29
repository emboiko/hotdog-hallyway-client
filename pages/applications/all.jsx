import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import AllApplications from "~/components/Pages/Applications/AllApplications"
import withRequiredLoggedInUser from "~/components/HOCs/withRequiredLoggedInUser"
import withRequiredCouncilMember from "~/components/HOCs/withRequiredCouncilMember"

const AllApplicationsPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway</title>
      </Head>
      <StandardPage>
        <AllApplications />
      </StandardPage>
    </>
  )
}

export default withRequiredLoggedInUser(withRequiredCouncilMember(AllApplicationsPage))
