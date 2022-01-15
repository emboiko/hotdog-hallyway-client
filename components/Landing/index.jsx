import React from "react"
import styled from "styled-components"
import Image from "next/image"
import HotDogStand from "/public/static/img/jpg/hotdogstand1.jpg"
import { UI_SIZES } from "~/utilities/constants.js"


const GuildNameBox = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Landing = () => {
  return (
    <div className="font-oswald" style={{background:"red"}}>
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90}/>
      <GuildNameBox>
        <h1>
        {"< Hotdog Hallway >"}
        </h1>
        <GuildRealm>
          Mankrik Horde TBC | Progression Raiding
        </GuildRealm>
      </GuildNameBox>
    </div>
  )
}

export default Landing
