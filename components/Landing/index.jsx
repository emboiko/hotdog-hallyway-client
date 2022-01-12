import React from "react"
import styled from "styled-components"
import Illidan from "/public/static/img/jpg/illidan.jpg"
import Image from "next/image"

const GuildNameBox = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px 10px 10px;
`

const GuildName = styled.h1`

`

const GuildRealm = styled.h2`
  font-size: 18px;
`

const BackgroundImage = styled(Image)`
  position: relative;
  z-index: 1;
`

const MainLanding = () => {
  return (
    <div className="font-oswald">
      <BackgroundImage src={Illidan} alt="Illidan" layout="fill" objectFit="cover" quality={90}/>
      <GuildNameBox>
        <GuildName>
        {"< Hotdog Hallway >"}
        </GuildName>
        <GuildRealm>
          Mankrik Horde TBC | Progression Raiding
        </GuildRealm>
      </GuildNameBox>
    </div>
  )
}

export default MainLanding
