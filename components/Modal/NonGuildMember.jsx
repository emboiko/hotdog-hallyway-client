import React from "react"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import SimpleButton from "~/components/Inputs/SimpleButton"

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

const mapStore = store => ({
  setNonMemberModalShowing: store.ui.setNonMemberModalShowing
})

const NonGuildMember = () => {
  const { setNonMemberModalShowing } = useInject(mapStore)
  return (
    <Wrapper>
      <MainHeader>
        Easy there, champ.
      </MainHeader>
      <SubHeader>
        This account is locked pending approval.
      </SubHeader>
      <MainText>
        Once your application is accepted, you can edit the fields on this page.
        If you're already a guild member, contact a council member to promote your account.
      </MainText>
      <SimpleButton width="25%" margin="0px 0px 20px 0px" padding="5px 0px" onClick={() => {setNonMemberModalShowing(false)}}>Close</SimpleButton>
    </Wrapper>
  )
}

export default NonGuildMember
