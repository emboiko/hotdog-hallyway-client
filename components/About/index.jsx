import React from "react"
import styled from "styled-components"
import Image from "next/image"
import HotDogStand from "/public/static/img/jpg/hotdogstand2.jpg"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const UnderConstruction = styled.div`
  font-size: 24px;
  text-align: center;
  position: relative;
`

const About = () => {
  return (
    <Wrapper>
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority/>
      <UnderConstruction>Under Construction</UnderConstruction>
    </Wrapper>
  )
}

export default About