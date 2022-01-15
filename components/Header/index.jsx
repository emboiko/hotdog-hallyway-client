import React from "react"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import { observer } from "mobx-react"
import { COLORS } from "~/utilities/constants.js"
import SimpleButton from "~/components/Inputs/SimpleButton"

const Header = styled.div`
  background: ${COLORS.darkGrey};
  color: #FFFFFF;
  height: 29px;
  display: flex;
  border-bottom: 1px solid ${COLORS.accentBlue};
  justify-content: flex-end;
  align-items: center;
`

const Username = styled.div`
  margin-left: 10px;
  margin-bottom: 2px;
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
      {!isLoggedIn && isTiny ? null : (
        <Username>
          {isLoggedIn ? user.username : "Guest"}
        </Username>
      )}
      {isLoggedIn ? (
        <>
          <SimpleButton 
            onClick={() => {logout()}}
            width="85px"
            margin="0px 10px"
          >
          Logout
          </SimpleButton>
        </>
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
    </Header>
  )
})

export default MainHeader
