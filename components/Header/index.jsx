import React from "react"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import { observer } from "mobx-react"

const Header = styled.div`
  background: #181A1B;
  color: #FFFFFF;
  height: 30px;
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
})

// Todo
const MainHeader = observer(() => {
  const { 
    user,
    isLoggedIn,
    logout,
    loginModalShowing, setLoginModalShowing,
    signupModalShowing, setSignupModalShowing
  } = useInject(mapStore)

  return (
    <Header className="font-oswald">
      <div>
        {isLoggedIn ? user.characterName : "Guest"}
      </div>
      {isLoggedIn ? (
        <>
          <button onClick={() => {
            logout()
          }}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => {
            setLoginModalShowing(!loginModalShowing)
          }}>Login</button>
          <button onClick={() => {
            setSignupModalShowing(!signupModalShowing)
          }}>Sign up</button>
        </>
      )}
    </Header>
  )
})

export default MainHeader
