import React from "react"
import Head from "next/head"
import StandardPage from "~/components/StandardPage"
import styled from "styled-components"

const UnderConstruction = styled.div`
  font-size: 24px;
  text-align: center;
`

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Hotdog Hallway</title>
      </Head>
      <StandardPage>
        <UnderConstruction>Under Construction</UnderConstruction>
      </StandardPage>
    </>
  )
}

export default AboutPage
