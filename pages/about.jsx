import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import About from "~/components/Pages/About"

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway | About</title>
      </Head>
      <StandardPage>
        <About />
      </StandardPage>
    </>
  )
}

export default AboutPage
