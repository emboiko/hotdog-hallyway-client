import React, {useEffect, useState} from "react"
import styled, { keyframes } from "styled-components"
import Link from "next/link"
import Image from "next/image"
import Router from "next/router"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import SimpleButton from "~/components/Inputs/SimpleButton"
import HomeIcon from "~/public/static/img/png/home.png"
import DiscordIcon from "~/public/static/img/png/discord.png"
import YoutubeIcon from "~/public/static/img/png/youtube.png"
import UserIcon from "~/public/static/img/png/user.png"
import { COLORS, UI_SIZES, BOSSES, WEB_URLS } from "~/utilities/constants.js"

const Header = styled.div`
  background: transparent;
  color: #FFFFFF;
  height: 40px;
  position: absolute;
  z-index: 2;
  top: 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Username = styled.div`
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 1px;
  &:hover {
    color: ${COLORS.lightGreen};
  }
  @media (max-width: ${UI_SIZES.medium}px) {
    margin-left: 0px;
  }
`

const UserIconContainer = styled.div`
  cursor: pointer;
  margin-left: 15px;
  margin-right: 10px;
`

const RightSide = styled.div`
  border-left: 1px solid ${COLORS.accentBlue};
  border-bottom: 1px solid ${COLORS.accentBlue};
  border-bottom-left-radius: 25px;
  background: ${COLORS.darkGrey};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 255px;
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  @media (max-width: ${UI_SIZES.medium}px) {
    box-shadow: none;
    max-width: initial;
    border-left: initial;
    border-bottom-left-radius: initial;
    width: 100%;
  }
`

const LeftSide = styled.div`
  border-right: 1px solid ${COLORS.accentBlue};
  border-bottom: 1px solid ${COLORS.accentBlue};
  border-bottom-right-radius: ${props => props.dropdownShowingPhase ? "0px" : "25px"};
  background: ${COLORS.darkGrey};
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 10px 0px ${COLORS.accentBlue};
  position: relative;
  transition: border-bottom-right-radius 0.5s;
  @media (max-width: ${UI_SIZES.medium}px) {
    box-shadow: none;
    border-right: initial;
    border-bottom-right-radius: initial;
    flex-shrink: 0;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    min-width: 100px;
  }
`

const Home = styled.div`
  margin-left: 5px;
  cursor: pointer;
  padding: 5px;
`

const Discord = styled.div`
  margin: 0px 5px;
  cursor: pointer;
  padding: 5px;
  margin-top: 2px;
`

const Youtube = styled.div`
  cursor: pointer;
  padding: 5px;
  margin-top: 2px;
  @media (max-width: ${UI_SIZES.medium}px) {
    margin-right: 2px;
  }
`

const UnderGlow = styled.div`
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  position: absolute;
  width: 100%;
  bottom: 0px;
  height: 3px;
  z-index: -1;
  border-bottom: 1px solid ${COLORS.accentBlue};
  display: ${props => props.isMedium ? "block" : "none"};
`

const BossKills = styled.div`
  width: 280px;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 1px;
  @media (max-width: ${UI_SIZES.medium}px) {
    width: initial;
    margin-right: 0px;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    margin-bottom: 0px;
  }
  @media (max-width: ${UI_SIZES.tiny}px) {
    display: none;
  }
`

const BossKillDropdownOpener = styled.div`
  margin: 0px 5px;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${COLORS.lightGreen};
  }
  @media (max-width: ${UI_SIZES.medium}px) {
    font-size: 21px;
    margin: 0px 7px 4px 7px;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    font-size: 17px;
  }
`

const fadeIn = keyframes`
  from {
      opacity: 0;
  }

  to {
      opacity: 1;
  }
`

const BossKillDropdown = styled.div`
  position: absolute;
  top: 40px;
  left: -5px;
  cursor: pointer;
  margin: 0px 5px;
  width: 100%;
  &:hover {
    color: ${COLORS.lightGreen};
  }
  border-right: 1px solid ${COLORS.accentBlue};
  border-bottom: 1px solid ${COLORS.accentBlue};
  display: ${props => props.showing ? "block" : "none"};
  box-shadow: 1px 1px 10px 0px ${COLORS.accentBlue};
  animation: ${fadeIn} 0.5s;
  max-height: calc(100vh - 41px);
  overflow: auto;
  &::-webkit-scrollbar {
    background: ${COLORS.darkGrey};
  }
  &::-webkit-scrollbar-thumb {
    background: ${COLORS.accentBlue};
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
`

const RaidName = styled.div`
  background: ${COLORS.darkGrey};
  color: ${COLORS.accentBlue};
  cursor: default;
`

const RaidHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${COLORS.darkGrey};
  padding: 0px 5px;
  cursor: default;
`

const KillCount = styled.div`
  display: flex;
  color: ${props => props.cleared ? COLORS.lightGreen : "yellow"};
`

const BossName = styled.div`
  background: ${COLORS.darkGrey};
  color: ${props => props.progressing ? "yellow" : "#FFFFFF"};
  text-align: center;
  cursor: default;
  position: relative;
  width: fit-content;
  margin: 0 auto;
`

const Strikethrough = styled.div`
  width: 100%;
  height: 2px;
  background: red;
  position: absolute;
  top: 50%;
`

const RaidSection = styled.div`
  background: ${COLORS.darkGrey};
`

const mapStore = store => ({
  user: store.auth.user,
  isLoggedIn: store.auth.isLoggedIn,
  logout: store.auth.logout,
  loginModalShowing: store.ui.loginModalShowing,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  signupModalShowing: store.ui.signupModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  isSmall: store.ui.isSmall,
  isMedium: store.ui.isMedium,
  discordLink: store.utility.discordLink,
  setNavigationAttempt: store.auth.setNavigationAttempt
})

const MainHeader = observer(() => {
  const { 
    isSmall,
    isMedium,
    user,
    isLoggedIn,
    discordLink,
    setNavigationAttempt,
    loginModalShowing, 
    setLoginModalShowing,
    setSignupModalShowing,
  } = useInject(mapStore)

  const [discordUrl, setDiscordUrl] = useState("")
  const [dropdownShowingPhase, setDropdownShowingPhase] = useState(0)

  useEffect(() => {
    setDiscordUrl(discordLink)
  })

  const LoginButton = (
    <SimpleButton 
      onClick={() => {setLoginModalShowing(!loginModalShowing)}} 
      width="85px"
      margin="0px 10px 0px 0px"
    >
    Login
    </SimpleButton>
  )

  const navigateToAccount = () => {
    if (isLoggedIn) {
      Router.push("/account")
    } else {
      setSignupModalShowing(true)
      setNavigationAttempt("/account")
    }
  }

  const closeDropdown = () => {
    setDropdownShowingPhase(0)
  }

  const phases = [1, 2, 3, 4, 5]

  const BossKillDropdownOpeners = phases.map((phase) => {
    const phaseName = `Phase ${phase}`
    return (
      <BossKillDropdownOpener key={phaseName} onClick={() => {setDropdownShowingPhase(phase)}} >
        {isMedium ? `P${phase}` : phaseName}
      </BossKillDropdownOpener>
    )
  })

  let raidPhase
  if (dropdownShowingPhase > 0) {
    raidPhase = BOSSES[`P${dropdownShowingPhase}`]
  } else {
    raidPhase = []
  }

  const raids = Object.keys(raidPhase)
  
  const BossKillList = raids.map((raid) => {
    const bosses = Object.keys(raidPhase[raid])
    
    let totalBossesCount = bosses.length
    let killedBossesCount = 0

    const bossNames = bosses.map((bossName) => {
      const boss = raidPhase[raid][bossName]
      if (boss.defeated) killedBossesCount += 1
      return (
        <BossName key={bossName} progressing={boss.progressing}>
          {bossName}
          {boss.defeated ? <Strikethrough/> : null}
        </BossName>
      )
    })

    let cleared = false
    if (killedBossesCount === totalBossesCount) cleared = true

    return (
      <RaidSection key={raid}>
        <RaidHeader>
          <RaidName>{raid}</RaidName>
          <KillCount cleared={cleared}>
            {killedBossesCount}
            /
            {totalBossesCount}
          </KillCount>
        </RaidHeader>
        {bossNames}
      </RaidSection>
    )
  })

  const BossKillDropdowns = (
    <BossKills>
      {BossKillDropdownOpeners}
      <BossKillDropdown showing={dropdownShowingPhase}>
        {BossKillList}
      </BossKillDropdown>
    </BossKills>
  )
  
  return (
    <Header className="font-oswald">
      <LeftSide dropdownShowingPhase={dropdownShowingPhase} onMouseLeave={closeDropdown} onTouchEnd={closeDropdown}>
        <Link href="/">
          <Home>
            <Image src={HomeIcon} alt="Home" width={25} height={25} />
          </Home>
        </Link>
        <a target="_blank" href={discordUrl}>
          <Discord>
            <Image src={DiscordIcon} alt="Discord" width={25} height={25} />
          </Discord>
        </a>
        <a target="_blank" href={WEB_URLS.youtube}>
          <Youtube>
            <Image src={YoutubeIcon} alt="YouTube" width={25} height={25} />
          </Youtube>
        </a>
        {isSmall ? null : BossKillDropdowns}
      </LeftSide>
      <RightSide>
        <UserIconContainer onClick={navigateToAccount}>
          <Image src={UserIcon} width={16} height={16} />
        </UserIconContainer>
        <Username onClick={navigateToAccount}>
          {isLoggedIn ? user.username : "Guest"}
        </Username>
        {isLoggedIn || isSmall ? null : LoginButton}
      </RightSide>
      <UnderGlow isMedium={isMedium}/>
    </Header>
  )
})

export default MainHeader
