import React from "react"
import styled from "styled-components"
import Header from "~/components/Header"
import Footer from "~/components/Footer"
import Modal from "~/components/Modal"
import SignupForm from "~/components/Forms/Signup"
import LoginForm from "~/components/Forms/Login"
import useInject from "~/hooks/useInject"
import {observer} from "mobx-react"
import { COLORS } from "~/utilities/constants.js"

const PageContent = styled.div`
  background: ${COLORS.darkGrey};
  color: #FFFFFF;
  height: 100vh;
  position: relative;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
    <Wrapper>
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
    </Wrapper>
  )
})

export default StandardPage
