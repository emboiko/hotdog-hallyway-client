import React from "react"
import styled from "styled-components"
import Modal from "~/components/Modal"
import SignupForm from "~/components/Forms/Signup"
import LoginForm from "~/components/Forms/Login"
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
  isUserLoggedIn: store.auth.isUserLoggedIn,
  loginModalShowing: store.ui.loginModalShowing,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  signupModalShowing: store.ui.signupModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
})

// Todo
const MainHeader = observer(() => {
  const { 
    user,
    isUserLoggedIn,
    logout,
    loginModalShowing, setLoginModalShowing,
    signupModalShowing, setSignupModalShowing
  } = useInject(mapStore)
  return (
    <Header className="font-oswald">
      {/* Todo */}
      <div>
        {user.characterName ? user.characterName : "Guest"}
      </div>
      {/* Todo */}
      {isUserLoggedIn ? (
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
          <>
            <Modal open={loginModalShowing}>
              <LoginForm />
            </Modal>
            <Modal open={signupModalShowing}>
              <SignupForm />
            </Modal>
          </>
        </>
      )}
    </Header>
  )
})

export default MainHeader
