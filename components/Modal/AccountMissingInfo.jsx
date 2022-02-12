import React from "react"
import Router from "next/router"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import SimpleButton from "~/components/Inputs/SimpleButton"
import { COLORS } from "~/utilities/constants.js"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: #FFFFFF;
`
const MainHeader = styled.div`
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
  width: 300px;
`

const SubHeader = styled.div`
  font-size: 22px;
  width: 90%;
  text-align: center;
`

const MainText = styled.div`
  font-size: 18px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
`

const MockLink = styled.span`
  color: ${COLORS.accentBlue};
  cursor: pointer;
`

const mapStore = store => ({
  setAccountMissingInfoModalShowing: store.ui.setAccountMissingInfoModalShowing
})

const AccountMissingInfo = () => {
  const { setAccountMissingInfoModalShowing } = useInject(mapStore)
  const navigateToAccount = () => {
    Router.push("/account")
    setAccountMissingInfoModalShowing(false)
  }
  return (
    <Wrapper>
      <MainHeader>
        Slow down there, captain.
      </MainHeader>
      <SubHeader>
        You need to finish setting up your <MockLink onClick={navigateToAccount}>account</MockLink>.
      </SubHeader>
      <MainText>
        Remember to update your class, race, and spec.
        While you're at it, upload an avatar for the roster page!
      </MainText>
      <SimpleButton width="25%" margin="0px 0px 20px 0px" padding="5px 0px" onClick={navigateToAccount}>Finish</SimpleButton>
    </Wrapper>
  )
}

export default AccountMissingInfo
