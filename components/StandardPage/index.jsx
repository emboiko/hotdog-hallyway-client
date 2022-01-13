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
  signupModalShowing: store.ui.signupModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
})

const StandardPage = observer(({children}) => {

  const {loginModalShowing, setLoginModalShowing, signupModalShowing, setSignupModalShowing} = useInject(mapStore)

  const loginSuccess = () => {
    setLoginModalShowing(false)
  }
  const loginFailure = () => {

  }
  const signupSuccess = () => {
    setSignupModalShowing(false)
  }
  const signupFailure = () => {

  }

  return (
    <>
      <Header />
      <PageContent>
        {children}
      </PageContent>
      <Footer />
      <>
        <Modal open={loginModalShowing}>
          <LoginForm successCB={loginSuccess} failureCB={loginFailure} />
        </Modal>
        <Modal open={signupModalShowing}>
          <SignupForm successCB={signupSuccess} failureCB={signupFailure} />
        </Modal>
      </>
    </>
  )
})

export default StandardPage
