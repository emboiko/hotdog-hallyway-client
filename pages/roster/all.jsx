import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import AllUsers from "~/components/Pages/Roster/AllUsers"
import withRequiredLoggedInUser from "~/components/HOCs/withRequiredLoggedInUser"
import withRequiredCouncilMember from "~/components/HOCs/withRequiredCouncilMember"

const AllUsersPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway | All Users</title>
      </Head>
      <StandardPage>
        <AllUsers />
      </StandardPage>
    </>
  )
}

export default withRequiredLoggedInUser(withRequiredCouncilMember(AllUsersPage))
