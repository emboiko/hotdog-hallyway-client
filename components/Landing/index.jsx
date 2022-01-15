import React from "react"
import styled from "styled-components"
import Image from "next/image"
import HotDogStand from "/public/static/img/jpg/hotdogstand1.jpg"
import { UI_SIZES, COLORS } from "~/utilities/constants.js"
import Link from "next/link"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
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
  font-size: 42px;
  border: 1px solid ${props => props.color};
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

const Links = styled.div`
  display: flex;
  @media (max-width: ${UI_SIZES.small}px) {
    flex-direction: column;
    align-items: center;
  }
`

const Landing = () => {
  return (
    <Wrapper>
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
        <Links>
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
          <Link href="/apply">
            <CallToAction color={COLORS.lightGreen}>
              Apply
            </CallToAction>
          </Link>
        </Links>
      </CallToActionContainer>
    </Wrapper>
  )
}

export default Landing
