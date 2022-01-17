import React from "react"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import Router from "next/router"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import SimpleButton from "~/components/Inputs/SimpleButton"
import HomeIcon from "~/public/static/img/png/home.png"
import DiscordIcon from "~/public/static/img/png/discord.png"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"

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
    width: 75%;
    max-width: initial;
    border-left: initial;
    border-bottom-left-radius: initial;
  }
`

const LeftSide = styled.div`
  border-right: 1px solid ${COLORS.accentBlue};
  border-bottom: 1px solid ${COLORS.accentBlue};
  border-bottom-right-radius: 25px;
  background: ${COLORS.darkGrey};
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 10px 0px ${COLORS.accentBlue};
  @media (max-width: ${UI_SIZES.medium}px) {
    box-shadow: none;
    width: 25%;
    border-right: initial;
    border-bottom-right-radius: initial;
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
  @media (max-width: ${UI_SIZES.medium}px) {
    margin-top: 2px;
  }
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

  return (
    <Header className="font-oswald">
      <LeftSide>
        <Link href="/">
          <Home>
            <Image src={HomeIcon} alt="Home" width={25} height={25} />
          </Home>
        </Link>
        <a target="_blank" href={discordLink}>
          <Discord>
            <Image src={DiscordIcon} alt="Discord" width={25} height={25} />
          </Discord>
        </a>
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
