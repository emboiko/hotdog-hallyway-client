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
import { COLORS, UI_SIZES, BOSSES } from "~/utilities/constants.js"

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
  margin-left: 20px;
  margin-bottom: 2px;
  @media (max-width: ${UI_SIZES.small}px) {
    margin-right: 10px;
    font-size: 18px;
  }
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

const ButtonContainer = styled.div`
  display: flex;
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
  width: 170px;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  @media (max-width: ${UI_SIZES.medium}px) {
    width: initial;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    display: none;
  }
`

const BossKillDropdownOpener = styled.div`
  margin: 0px 5px;
  cursor: pointer;
  &:hover {
    color: ${COLORS.lightGreen};
  }
  @media (max-width: ${UI_SIZES.small}px) {
    font-size: 22px;
    margin: 0px 7px 4px 7px;
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

`

const BossName = styled.div`
  text-decoration: ${props => props.defeated ? "line-through" : "none"};
  background: ${COLORS.darkGrey};
  color: ${props => props.progressing ? "yellow" : "#FFFFFF"};
  text-align: center;
  cursor: default;
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
    logout,
    loginModalShowing, setLoginModalShowing,
    signupModalShowing, setSignupModalShowing,
    discordLink,
    setNavigationAttempt
  } = useInject(mapStore)

  const [discordUrl, setDiscordUrl] = useState("")
  const [dropdownShowingPhase, setDropdownShowingPhase] = useState(0)

  useEffect(() => {
    setDiscordUrl(discordLink)
  })

  const LogoutButton = (
    <SimpleButton 
      onClick={() => {logout()}}
      width="85px"
      margin="0px 10px"
    >
    Logout
    </SimpleButton>
  )

  const LoginButton = (
    <SimpleButton 
      onClick={() => {setLoginModalShowing(!loginModalShowing)}} 
      width="85px"
      margin="0px 10px"
    >
    Login
    </SimpleButton>
  )

  const SignupButton = (
    <SimpleButton 
      onClick={() => {setSignupModalShowing(!signupModalShowing)}} 
      width="85px"
      margin="0px 10px"
    >
    Sign Up
    </SimpleButton>
  )

  const Buttons = isSmall ? null : (
    <ButtonContainer>
      {isLoggedIn ? (
        <>
          {LogoutButton}
        </>
      ) : (
        <>
          {LoginButton}
          {SignupButton}
        </>
      )}
    </ButtonContainer>
  )

  const isUserLoggedIn = () => {
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

  const phases = [1,2,3]

  const BossKillDropdownOpeners = phases.map((phase) => {
    const phaseName = `Phase ${phase}`
    return (
      <BossKillDropdownOpener key={phaseName} onClick={() => {setDropdownShowingPhase(phase)}} >
        {isSmall ? `P${phase}` : phaseName}
      </BossKillDropdownOpener>
    )
  })

  let bosses
  if (dropdownShowingPhase > 0) {
    bosses = BOSSES[`P${dropdownShowingPhase}`]
  } else {
    bosses = []
  }

  const BossKillDropdowns = (
    <BossKills>
      {BossKillDropdownOpeners}
      <BossKillDropdown showing={dropdownShowingPhase}>
        {Object.keys(bosses).map((boss) => {
          return <BossName key={boss} defeated={bosses[boss].defeated} progressing={bosses[boss].progressing}>{boss}</BossName>
        })}
      </BossKillDropdown>
    </BossKills>
  )
        console.log(isSmall)
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
        {BossKillDropdowns}
      </LeftSide>
      <RightSide>
        <Username onClick={isUserLoggedIn}>
          {isLoggedIn ? user.username : "Guest"}
        </Username>
        {Buttons}
      </RightSide>
      <UnderGlow isMedium={isMedium}/>
    </Header>
  )
})

export default MainHeader
