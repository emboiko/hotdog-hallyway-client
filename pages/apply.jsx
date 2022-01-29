import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import Apply from "~/components/Pages/Apply"
import withRequiredLoggedInUser from "~/components/HOCs/withRequiredLoggedInUser"

const ApplyPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway | Apply</title>
      </Head>
      <StandardPage>
        <Apply />
      </StandardPage>
    </>
  )
}

export default withRequiredLoggedInUser(ApplyPage)
