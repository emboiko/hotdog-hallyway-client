import React from "react"
import styled from "styled-components"
import Header from "~/components/Header"
import Modal from "~/components/Modal"
import SignupForm from "~/components/Forms/Signup"
import LoginForm from "~/components/Forms/Login"
import AccountMissingInfo from "~/components/Modal/AccountMissingInfo"
import NonGuildMember from "~/components/Modal/NonGuildMember"
import useInject from "~/hooks/useInject"
import {observer} from "mobx-react"
import { COLORS } from "~/utilities/constants.js"

const PageContent = styled.div`
  background: ${COLORS.darkGrey};
  color: #FFFFFF;
  position: relative;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const mapStore = store => ({
  accountMissingInfoModalShowing: store.ui.accountMissingInfoModalShowing,
  setAccountMissingInfoModalShowing: store.ui.setAccountMissingInfoModalShowing,
  nonMemberModalShowing: store.ui.nonMemberModalShowing,
  setNonMemberModalShowing: store.ui.setNonMemberModalShowing,
  loginModalShowing: store.ui.loginModalShowing,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  setLoginError: store.auth.setLoginError,
  signupModalShowing: store.ui.signupModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  setSignupError: store.auth.setSignupError,
  setNavigationAttempt: store.auth.setNavigationAttempt
})

const StandardPage = observer(({children}) => {

  const {
    accountMissingInfoModalShowing, setAccountMissingInfoModalShowing,
    nonMemberModalShowing, setNonMemberModalShowing,
    loginModalShowing, setLoginModalShowing, setLoginError, 
    signupModalShowing, setSignupModalShowing, setSignupError,
    setNavigationAttempt
  } = useInject(mapStore)

  const closeLoginModal = () => {
    setLoginModalShowing(false)
    setLoginError("")
    setNavigationAttempt("")
  }

  const closeSignupModal = () => {
    setSignupModalShowing(false)
    setSignupError("")
    setNavigationAttempt("")
  }

  return (
    <Wrapper>
      <Header />
      <PageContent>
        {children}
      </PageContent>
      <>
        <Modal open={loginModalShowing} closer={closeLoginModal}>
          <LoginForm successCB={closeLoginModal} />
        </Modal>
        <Modal open={signupModalShowing} closer={closeSignupModal} height={240}>
          <SignupForm successCB={closeSignupModal} />
        </Modal>
        <Modal open={accountMissingInfoModalShowing} closer={() => {setAccountMissingInfoModalShowing(false)}} height={300} width={450}>
          <AccountMissingInfo />
        </Modal>
        <Modal open={nonMemberModalShowing} closer={() => {setNonMemberModalShowing(false)}} height={300} width={450}>
          <NonGuildMember />
        </Modal>
      </>
    </Wrapper>
  )
})

export default StandardPage
