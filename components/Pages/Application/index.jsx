import React from "react"
import styled from "styled-components"
import Image from "next/image"
import HotDogStand from "/public/static/img/jpg/hotdogstand3.jpg"
import { COLORS } from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const ApplicationWrapper = styled.div`
  position: relative;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const MainHeader = styled.div`
  text-align: center;
  font-size: 72px;
  color: pink;
  border-radius: 5px;
  border: 2px solid pink;
  box-shadow: 3px 2px 10px 0px pink;
  width: 500px;
  margin-bottom: 25px;
`

const ApplicationBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  width: 70%;
  height: 70vh;
  background: ${COLORS.darkGrey};
  opacity: 0.97;
  min-width: 500px;
  max-width: 2000px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: pink;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
`

const Spacer = styled.div`
  height: 4000px;
`

const Application = () => {
  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority/>
      <ApplicationWrapper>
        <MainHeader>Guild Application</MainHeader>
        <ApplicationBox>
          <Spacer></Spacer>
        </ApplicationBox>
      </ApplicationWrapper>
    </SectionWrapper>
  )
}

export default Application
