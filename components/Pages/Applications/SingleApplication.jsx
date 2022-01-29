import React from "react"
import Image from "next/image"
import styled from "styled-components"
import HotDogStand from "/public/static/img/jpg/hotdogstand7.jpg"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"

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
  overflow: hidden;
  margin-bottom: 25px;
`

const MainHeader = styled.div`
  text-align: center;
  font-size: 72px;
  color: pink;
  border-radius: 5px;
  border: 2px solid pink;
  box-shadow: 3px 2px 10px 0px pink;
  width: 400px;
  margin-bottom: 25px;
  position: relative;
  background: rgba(0,0,0,0.8);
  @media (max-width: ${UI_SIZES.medium}px) {
    font-size: 48px;
    width: 200px;
  }
`

const ApplicationBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  background: ${COLORS.darkGrey};
  width: 70%;
  min-width: 500px;
  max-width: 1000px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
    background: rgba(24, 26, 27, 0.975);
  }
  &::-webkit-scrollbar-thumb {
    background: pink;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${UI_SIZES.medium}px) {
    min-width: initial;
    width: 90%;
  }
`

const AllApplications = () => {
  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" objectPosition="top right" quality={90} priority/>
      <ApplicationWrapper>
        <MainHeader>
          Application
        </MainHeader>
        <ApplicationBox>
          Application goes here.
        </ApplicationBox>
      </ApplicationWrapper>
    </SectionWrapper>
  )
}

export default AllApplications
