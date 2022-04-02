import React, {useEffect, useState} from "react"
import Image from "next/image"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import SimpleButton from "~/components/Inputs/SimpleButton"
import HotDogStand from "/public/static/img/jpg/hotdogstand4.jpg"
import scrollToElement from "~/utilities/scrollToElement"
import { UI_SIZES, COLORS} from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const AllUsersWrapper = styled.div`
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

const AllUsersBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  width: 60%;
  background: ${COLORS.darkGrey};
  opacity: 0.975;
  min-width: 450px;
  max-width: 900px;
  overflow: auto;
  font-size: 24px;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: pink;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    min-width: 90%;
  }
`

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0px;
  padding: 5px 0px;
  transition: background .5s;
  &:hover {
    background: #333;
  }
`

const Username = styled.div`
  margin-bottom: 5px; 
`

const UserGroupHeader = styled.div`
  font-size: 32px;
  text-align: center;
  color: ${props => props.color || "initial"};
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: red;
  margin: 10px 0px;
`

const mapStore = store => ({
  getAllUsers: store.auth.getAllUsers,
  deleteUser: store.auth.deleteUser,
  changeUserRank: store.auth.changeUserRank
})

const Roster = () => {
  const { getAllUsers, deleteUser, changeUserRank } = useInject(mapStore)

  const [councilMembers, setCouncilMembers] = useState([])
  const [raidMembers, setRaidMembers] = useState([])
  const [guildMembers, setGuildMembers] = useState([])
  const [nonGuildMembers, setNonGuildMembers] = useState([])

  const [updater, setUpdater] = useState(false) // Redo the request after we change a rank to update the UI. An arbitrary boolean that flips back and forth meaninglessly.

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(async () => {
    const { guildCouncilMembers, guildRaiderMembers, guildRegularMembers, guildNonMembers, error } = await getAllUsers()
    if (error) return console.error(error)
    setCouncilMembers(guildCouncilMembers)
    setRaidMembers(guildRaiderMembers)
    setGuildMembers(guildRegularMembers)
    setNonGuildMembers(guildNonMembers)
  }, [updater])

  const councilMemberCards = councilMembers.map((member) => {
    return (
      <MemberCard key={member.id} id={member.username}>
        <Username>
          {member.username}
        </Username>
      </MemberCard>
    )
  })
  const guildRaiderCards = raidMembers.map((member) => {
    return (
      <MemberCard key={member.id} id={member.username}>
        <Username>
          {member.username}
        </Username>
        <Controls>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onDeleteUser(member)}}>Delete</SimpleButton>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onChangeUserRank(member, "Demote")}}>Demote</SimpleButton>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onChangeUserRank(member, "Promote")}}>Promote</SimpleButton>
        </Controls>
      </MemberCard>
    )
  })
  const guildMemberCards = guildMembers.map((member) => {
    return (
      <MemberCard key={member.id} id={member.username}>
        <Username>
          {member.username}
        </Username>
        <Controls>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onDeleteUser(member)}}>Delete</SimpleButton>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onChangeUserRank(member, "Demote")}}>Demote</SimpleButton>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onChangeUserRank(member, "Promote")}}>Promote</SimpleButton>
        </Controls>
      </MemberCard>
    )
  })
  const nonGuildMemberCards = nonGuildMembers.map((member) => {
    return (
      <MemberCard key={member.id} id={member.username}>
        <Username>
          {member.username}
        </Username>
        {
          member.applicationID ? (
            <a target="_blank" href={`/applications/${member.applicationID}`}>{member.applicationID}</a>
          ) : null
        }
        <Controls>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onDeleteUser(member)}}>Delete</SimpleButton>
          <SimpleButton width="75px" margin="5px 10px" padding="5px" onClick={() => {onChangeUserRank(member, "Promote")}}>Promote</SimpleButton>
        </Controls>
      </MemberCard>
    )
  })

  const onDeleteUser = async (member) => {
    setErrorMessage("")
    if (confirm(`Are you sure you want to delete ${member.username}'s account? This action is permanent and irreversible.`)) {
      const success = await deleteUser(member.id)
      if (success) {
        document.getElementById(member.username).remove()
      } else {
        scrollToElement(".error-scroll-landmark")
        setErrorMessage(`Error deleting user ${member.username}.`)
      }
    }
  }

  const onChangeUserRank = async (member, action) => {
    setErrorMessage("")
    const success = await changeUserRank(member.id, action)
    if (success) {
      setUpdater(!updater)
    } else {
      scrollToElement(".error-scroll-landmark")
      setErrorMessage(`Error - action ${action.toLowerCase()} failed for user ${member.username}.`)
    }
  }

  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority/> 
      <AllUsersWrapper>
        <MainHeader>
          All Users
        </MainHeader>
        <AllUsersBox>
          {errorMessage ? (
            <>
              <div className="error-scroll-landmark"/>
              <ErrorContainer>{errorMessage}</ErrorContainer>
            </>
          ) : null}
          <>
            <UserGroupHeader color={COLORS.lightGreen}>Council</UserGroupHeader>
            {councilMemberCards}
          </>
          <>
            <UserGroupHeader color={"Orange"}>Raiders</UserGroupHeader>
            {guildRaiderCards}
          </>
          <>
            <UserGroupHeader color={"yellow"}>Guild Members</UserGroupHeader>
            {guildMemberCards}
          </>
          <>
            <UserGroupHeader color={COLORS.red}>Non Guild Members</UserGroupHeader>
            {nonGuildMemberCards}
          </>
        </AllUsersBox>
      </AllUsersWrapper>
    </SectionWrapper>
  )
}

export default Roster
