import React from "react"
import styled from "styled-components"
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import Modal from "~/components/Modal"
import SignupForm from "~/components/Forms/Signup"
import LoginForm from "~/components/Forms/Login"
import useInject from "~/hooks/useInject"
import {observer} from "mobx-react"

const PageContent = styled.div`
  background: #181A1B;
  color: #FFFFFF;
  height: calc(100vh - 30px);
  position: relative;
`

const mapStore = store => ({
  loginModalShowing: store.ui.loginModalShowing,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  setLoginError: store.auth.setLoginError,
  signupModalShowing: store.ui.signupModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  setSignupError: store.auth.setSignupError,
})

const StandardPage = observer(({children}) => {

  const {loginModalShowing, setLoginModalShowing, setLoginError, signupModalShowing, setSignupModalShowing, setSignupError} = useInject(mapStore)

  const closeLoginModal = () => {
    setLoginModalShowing(false)
    setLoginError("")
  }

  const closeSignupModal = () => {
    setSignupModalShowing(false)
    setSignupError("")
  }

  return (
    <>
      <Header />
      <PageContent>
        {children}
      </PageContent>
      <Footer />
      <>
        <Modal open={loginModalShowing} closer={closeLoginModal}>
          <LoginForm successCB={closeLoginModal} />
        </Modal>
        <Modal open={signupModalShowing} closer={closeSignupModal} height="240px">
          <SignupForm successCB={closeSignupModal} />
        </Modal>
      </>
    </>
  )
})

export default StandardPage
