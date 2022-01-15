import React from "react"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"
import SimpleButton from "~/components/Inputs/SimpleButton"
import HomeIcon from "~/public/static/img/png/home.png"

const Header = styled.div`
  background: transparent;
  color: #FFFFFF;
  height: 40px;
  position: absolute;
  z-index: 10;
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
  justify-content: space-evenly;
  width: 245px;
  @media (max-width: ${UI_SIZES.medium}px) {
    width: 50%;
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
  @media (max-width: ${UI_SIZES.medium}px) {
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

const mapStore = store => ({
  user: store.auth.user,
  isLoggedIn: store.auth.isLoggedIn,
  logout: store.auth.logout,
  loginModalShowing: store.ui.loginModalShowing,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  signupModalShowing: store.ui.signupModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  isTiny: store.ui.isTiny
})

const MainHeader = observer(() => {
  const { 
    user,
    isLoggedIn,
    logout,
    loginModalShowing, setLoginModalShowing,
    signupModalShowing, setSignupModalShowing,
    isTiny
  } = useInject(mapStore)

  return (
    <Header className="font-oswald">
      <LeftSide>
        <Link href="/">
          <Home>
            <Image src={HomeIcon} alt="home" width={25} height={25} />
          </Home>
        </Link>
      </LeftSide>
      <RightSide>
        {!isLoggedIn && isTiny ? null : (
          <Username>
            {isLoggedIn ? user.username : "Guest"}
          </Username>
        )}
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
      </RightSide>
    </Header>
  )
})

export default MainHeader
