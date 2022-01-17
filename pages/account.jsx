import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import Account from "~/components/Pages/Account"

const AccountPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway | My Account</title>
      </Head>
      <StandardPage>
        <Account />
      </StandardPage>
    </>
  )
}

export default AccountPage
