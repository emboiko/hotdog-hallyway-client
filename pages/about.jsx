import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import About from "~/components/About"

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway</title>
      </Head>
      <StandardPage>
        <About />
      </StandardPage>
    </>
  )
}

export default AboutPage
