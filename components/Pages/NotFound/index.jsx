import React, { useEffect, useState } from "react"
import Router from "next/router"
import Image from "next/image"
import styled from "styled-components"
import HotdogStand from "/public/static/img/jpg/hotdogstand8.jpg"
import { UI_SIZES, COLORS } from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const NotFoundBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  width: 300px;
  background: ${COLORS.darkGrey};
  opacity: 0.975;
  @media (max-width: ${UI_SIZES.small}px) {
    width: 80%;
  }
  @media (max-width: ${UI_SIZES.tiny}px) {
    width: 90%;
  }
`

const MainText = styled.div`
  font-size: 32px;
`

const SubText = styled.div`
  font-size: 24px;
`

const NotFound = () => {
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (count > 1) {
      setTimeout(() => {
        setCount(count-1)
      }, 1000)
    } else {
      Router.push("/")
    }
  }, [count])

  return (
    <>
      <SectionWrapper>
        <Image src={HotdogStand} alt="Hotdog stand" layout="fill" objectFit="cover" quality={90} priority/>
        <NotFoundBox className="font-oswald">
          <MainText>
            Page not found.
          </MainText>
          <SubText>
            You will be redirected in {count}
          </SubText>
        </NotFoundBox>
      </SectionWrapper>
    </>
  )
}

export default NotFound
