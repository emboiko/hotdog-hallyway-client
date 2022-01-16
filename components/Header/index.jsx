import React from "react"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"
import SimpleButton from "~/components/Inputs/SimpleButton"
import HomeIcon from "~/public/static/img/png/home.png"
import DiscordIcon from "~/public/static/img/png/discord.png"

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
  margin-left: 20px;
  margin-bottom: 2px;
`

const RightSide = styled.div`
  border-left: 1px solid ${COLORS.accentBlue};
  border-bottom: 1px solid ${COLORS.accentBlue};
  border-bottom-left-radius: 25px;
  background: ${COLORS.darkGrey};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 245px;
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  @media (max-width: ${UI_SIZES.medium}px) {
    box-shadow: 2px 2px 10px 0px ${COLORS.accentBlue};
    clip-path: inset(0px 0px -10px 0px);
    width: 50%;
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
  min-width: 50px;
  box-shadow: 1px 1px 10px 0px ${COLORS.accentBlue};
  @media (max-width: ${UI_SIZES.medium}px) {
    box-shadow: 2px 2px 10px 0px ${COLORS.accentBlue};
    width: 50%;
    border-right: initial;
    border-bottom-right-radius: initial;
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
`

const Buttons = styled.div`
  display: flex;
`

const mapStore = store => ({
  user: store.auth.user,
  isLoggedIn: store.auth.isLoggedIn,
  logout: store.auth.logout,
  loginModalShowing: store.ui.loginModalShowing,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  signupModalShowing: store.ui.signupModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  isTiny: store.ui.isTiny,
  discordLink: store.utility.discordLink
})

const MainHeader = observer(() => {
  const { 
    isTiny,
    user,
    isLoggedIn,
    logout,
    loginModalShowing, setLoginModalShowing,
    signupModalShowing, setSignupModalShowing,
    discordLink
  } = useInject(mapStore)


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
        {!isLoggedIn && isTiny ? null : (
          <Username>
            {isLoggedIn ? user.username : "Guest"}
          </Username>
        )}
        <Buttons>
          {isLoggedIn ? (
            <SimpleButton 
              onClick={() => {logout()}}
              width="85px"
              margin="0px 10px"
            >
            Logout
            </SimpleButton>
          ) : (
            <>
              <SimpleButton 
                onClick={() => {setLoginModalShowing(!loginModalShowing)}} 
                width="85px"
                margin="0px 10px"
              >
              Login
              </SimpleButton>
              <SimpleButton 
                onClick={() => {setSignupModalShowing(!signupModalShowing)}} 
                width="85px"
                margin="0px 10px 0px 0px"
              >
              Sign Up
              </SimpleButton>
            </>
          )}
        </Buttons>
      </RightSide>
    </Header>
  )
})

export default MainHeader
