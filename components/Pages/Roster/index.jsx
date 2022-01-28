import React, {useEffect, useState} from "react"
import Image from "next/image"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import HotDogStand from "/public/static/img/jpg/hotdogstand4.jpg"
import { UI_SIZES, COLORS } from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const RosterWrapper = styled.div`
  position: relative;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-bottom: 25px;
  @media (max-width: ${UI_SIZES.small}px) {
    margin-top: 60px;
  }
`

const MainHeader = styled.div`
  text-align: center;
  font-size: 72px;
  color: pink;
  border-radius: 5px;
  border: 2px solid pink;
  box-shadow: 3px 2px 10px 0px pink;
  width: 450px;
  margin-bottom: 25px;
  position: relative;
  background: rgba(0,0,0,0.85);
  @media (max-width: ${UI_SIZES.small}px) {
    font-size: 48px;
    margin-bottom: 12px;
    width: 100%;
  }
  @media (max-width: ${UI_SIZES.tiny}px) {
    font-size: 32px;
  }
`

const RosterBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  width: 60%;
  background: ${COLORS.darkGrey};
  opacity: 0.975;
  min-width: 450px;
  max-width: 900px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: pink;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${UI_SIZES.small}px) {
    min-width: 90%;
  }
`

const CouncilMemberBox = styled.div`
  margin: 15px 0px;
`

const GuildMemberBox = styled.div`
  margin: 15px 0px;
`

const MemberHeader = styled.div`
  font-size: 38px;
  margin-bottom: 15px;
  color: ${COLORS.accentBlue};
  @media (max-width: ${UI_SIZES.small}px) {
    font-size: 28px;
  }
`

const Members = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Member = styled.div`
  font-size: 24px;
`

const mapStore = store => ({
  getAllUsers: store.auth.getAllUsers
})

const Roster = () => {
  const { getAllUsers } = useInject(mapStore)

  const [councilMembers, setCouncilMembers] = useState([])
  const [guildMembers, setGuildMembers] = useState([])

  useEffect(async () => {
    const { guildCouncilMembers, guildRegularMembers, error } = await getAllUsers()
    if (error) return console.error(error)
    setCouncilMembers(guildCouncilMembers)
    setGuildMembers(guildRegularMembers)
  }, [])

  const councilMemberList = councilMembers.map((member) => {
    return (
      <Member key={member.username} isCouncil>
        {member.username}
      </Member>
    )
  })
  
  const guildMemberList = guildMembers.map((member) => {
    return (
      <Member key={member.username}>
        {member.username}
      </Member>
    )
  })

  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority/>
      <RosterWrapper>
        <MainHeader>
          Raid Roster
        </MainHeader>
        <RosterBox>
          <CouncilMemberBox>
            <MemberHeader>Guild Council</MemberHeader>
            <Members>{councilMemberList}</Members>
          </CouncilMemberBox>
          <GuildMemberBox>
            <MemberHeader>Guild Members</MemberHeader>
            <Members>{guildMemberList}</Members>
          </GuildMemberBox>
        </RosterBox>
      </RosterWrapper>
    </SectionWrapper>
  )
}

export default Roster
