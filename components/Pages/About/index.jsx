import React from "react"
import styled from "styled-components"
import Image from "next/image"
import HotDogStand from "/public/static/img/jpg/hotdogstand2.jpg"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const UnderConstruction = styled.div`
  font-size: 24px;
  text-align: center;
  position: relative;
`

const About = () => {
  return (
    <SectionWrapper>
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority/>
      <UnderConstruction>Under Construction</UnderConstruction>
    </SectionWrapper>
  )
}

export default About
