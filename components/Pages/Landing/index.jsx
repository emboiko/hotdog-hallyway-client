import React from "react"
import { observer } from "mobx-react"
import Image from "next/image"
import Link from "next/link"
import Router from "next/router"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import HotDogStand from "/public/static/img/jpg/hotdogstand1.jpg"
import { UI_SIZES, COLORS } from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const Guildname = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  @media (max-width: ${UI_SIZES.tiny}px) {
    left: 0px;
    right: 0px;
    font-size: 5vw;
  }
`

const GuildRealm = styled.h2`
  font-size: 18px;
  @media (max-width: ${UI_SIZES.tiny}px) {
    font-size: 5vw;
  }
`

const CallToActionContainer = styled.div`
  position: relative;
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  @media (max-width: ${UI_SIZES.small}px) {
    margin-top: 60px;
  }
`

const CallToAction = styled.div`
  background: rgba(0,0,0,0.4);
  font-size: 42px;
  border: 2px solid ${props => props.color};
  border-radius: 5px;
  color: ${props => props.color};
  box-shadow: 3px 2px 10px 0px ${props => props.color};
  padding: 0px 10px 5px 10px;
  margin: 0px 10px;
  width: 33%;
  cursor: pointer;
  transition: background 0.5s linear;
  &:hover {
    box-shadow: 3px 2px 15px 0px ${props => props.color};
    color: #000000;
    background: ${props => props.color};
  }
  @media (max-width: ${UI_SIZES.small}px) {
    margin: 10px 0px;
    width: 50%;
    text-align: center;
    font-size: 32px;
  }
`

const Actions = styled.div`
  display: flex;
  @media (max-width: ${UI_SIZES.small}px) {
    flex-direction: column;
    align-items: center;
  }
`

const mapStore = store => ({
  isLoggedIn: store.auth.isLoggedIn,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  setNavigationAttempt: store.auth.setNavigationAttempt
})

const Landing = observer(() => {
  const { isLoggedIn, setSignupModalShowing, setNavigationAttempt } = useInject(mapStore)

  const isUserLoggedIn = () => {
    if (isLoggedIn) {
      Router.push("/apply")
    } else {
      setSignupModalShowing(true)
      setNavigationAttempt("/apply")
    }
  }

  return (
    <>
      <SectionWrapper>
        <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority/>
        <CallToActionContainer className="font-squadaone">
          <Guildname className="font-oswald">
            <h1>
            {"< Hotdog Hallway >"}
            </h1>
            <GuildRealm>
              Mankrik Horde TBC | Progression Raiding
            </GuildRealm>
          </Guildname>
          <Actions>
            <Link href="/about">
              <CallToAction color={COLORS.red}>
                About
              </CallToAction>
            </Link>
            <Link href="/roster">
              <CallToAction color={COLORS.yellow}>
                Roster
              </CallToAction>
            </Link>
            <CallToAction color={COLORS.lightGreen} onClick={isUserLoggedIn}>
              Apply
            </CallToAction>
          </Actions>
        </CallToActionContainer>
      </SectionWrapper>
    </>
  )
})

export default Landing
