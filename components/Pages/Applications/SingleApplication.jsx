import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import ButtonInput from "~/components/Inputs/ButtonInput"
import HotDogStand from "/public/static/img/jpg/hotdogstand7.jpg"
import { COLORS, UI_SIZES, APPLICATION_STATUSES } from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const ApplicationWrapper = styled.div`
  position: relative;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-bottom: 25px;
`

const MainHeader = styled.div`
  text-align: center;
  font-size: 72px;
  color: pink;
  border-radius: 5px;
  border: 2px solid pink;
  box-shadow: 3px 2px 10px 0px pink;
  width: 400px;
  margin-bottom: 25px;
  position: relative;
  background: rgba(0,0,0,0.8);
  @media (max-width: ${UI_SIZES.medium}px) {
    font-size: 48px;
    width: 250px;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    width: 100%;
  }
`

const ApplicationBox = styled.div`
  padding: 10px 0px;
  font-size: 20px;
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  background: ${COLORS.darkGrey};
  width: 70%;
  min-width: 500px;
  max-width: 1000px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
    background: rgba(24, 26, 27, 0.975);
  }
  &::-webkit-scrollbar-thumb {
    background: pink;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${UI_SIZES.medium}px) {
    min-width: initial;
    width: 90%;
  }
`

const ErrorMessage = styled.div`
  color: red;
`

const ApplicationField = styled.div`
  display: flex;
  width: 90%;
  flex-direction: ${props => props.direction || "row"};
  border-bottom: 1px solid #FFFFFF;
  margin-bottom: 5px;
`

const ApplicationKey = styled.div`
  width: 50%;
  color: ${COLORS.accentBlue}
`

const ApplicationValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignItems || "center"};
  width: ${props => props.width || "50%"};
`

const StatusContainer = styled.div`
  text-align: center;
`

const Status = styled.span`
  color: ${props => props.color || "#FFFFFF"};
`

const Buttons = styled.div`
  display: flex;
  width: 200px;
  margin-top: 10px;
  justify-content: center;
`

const mapStore = store => ({
  getApplication: store.applications.getApplication,
  acceptApplication: store.applications.acceptApplication,
  declineApplication: store.applications.declineApplication,
  deleteApplication: store.applications.deleteApplication,
})

const SingleApplication = () => {
  const { getApplication, acceptApplication, declineApplication, deleteApplication } = useInject(mapStore)

  const [application, setApplication] = useState({})
  const [discordUsername, setDiscordUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const router = useRouter()

  useEffect(async () => {
    if (router.isReady) {
      const {applicationData, discordUsername} = await getApplication(router.query.slug)
      if (applicationData && discordUsername) {
        setApplication(applicationData)
        setDiscordUsername(discordUsername)
      } else {
        setErrorMessage("Unable to get application data.")
      }
    }
  }, [router.isReady])

  let color;
  if (application.status === APPLICATION_STATUSES.pending) color = "yellow"
  if (application.status === APPLICATION_STATUSES.accepted) color = COLORS.lightGreen
  if (application.status === APPLICATION_STATUSES.declined) color = COLORS.red

  const onAcceptApplication = async () => {
    const success = await acceptApplication(router.query.slug)
    if (success) {
      router.push("/applications/all")
    } else {
      setErrorMessage("Error accepting application")
    }
  }
  
  const onDeclineApplication = async () => {
    const success = await declineApplication(router.query.slug)
    if (success) {
      router.push("/applications/all")
    } else {
      setErrorMessage("Error declining application")
    }
  }
  
  const onDeleteApplication = async () => {
    const success = await deleteApplication(router.query.slug)
    if (success) {
      router.push("/applications/all")
    } else {
      setErrorMessage("Error deleting application")
    }
  }

  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" objectPosition="top right" quality={90} priority/>
      <ApplicationWrapper>
        <MainHeader>
          Application
        </MainHeader>
        <ApplicationBox>
          <ErrorMessage>
            {errorMessage}
          </ErrorMessage>
          <ApplicationField>
            <ApplicationKey>Discord Username</ApplicationKey>
            <ApplicationValue>
              {discordUsername}
            </ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Character name</ApplicationKey>
            <ApplicationValue>
              {application.playerCharacterName}
            </ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Race</ApplicationKey>
            <ApplicationValue>{application.playerRace}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Class</ApplicationKey>
            <ApplicationValue>{application.playerClass}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Spec</ApplicationKey>
            <ApplicationValue>{application.playerSpecialization}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Interested in PvP</ApplicationKey>
            <ApplicationValue>{String(application.playerInterestedInPvP)}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Interested in Raiding</ApplicationKey>
            <ApplicationValue>{String(application.playerInterestedInRaiding)}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Agreed to raid times</ApplicationKey>
            <ApplicationValue>{String(application.playerAgreedToRaidTimes)}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Agreed to loot council</ApplicationKey>
            <ApplicationValue>{String(application.playerAgreedToLootCouncil)}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Agreed to attendancy policy</ApplicationKey>
            <ApplicationValue>{String(application.playerAgreedToAttendancePolicy)}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Agreed to gems and enchants</ApplicationKey>
            <ApplicationValue>{String(application.playerAgreedToGemsAndEnchants)}</ApplicationValue>
          </ApplicationField>
          <ApplicationField>
            <ApplicationKey>Agreed to working headset/microphone</ApplicationKey>
            <ApplicationValue>{String(application.playerAgreedToWorkingMicrophone)}</ApplicationValue>
          </ApplicationField>
          <ApplicationField direction="column">
            <ApplicationKey>Player raid utility</ApplicationKey>
            <ApplicationValue width="100%" alignItems="flex-start" className="font-oswald">{application.playerRaidUtility || "None"}</ApplicationValue>
          </ApplicationField>
          <ApplicationField direction="column" noBorder>
            <ApplicationKey>Player additional info</ApplicationKey>
            <ApplicationValue width="100%" alignItems="flex-start" className="font-oswald">{application.playerAdditionalInfo || "None"}</ApplicationValue>
          </ApplicationField>
          <div>
              <StatusContainer>Status:<Status color={color}>&nbsp;{application.status}</Status></StatusContainer>
              <Buttons>
                {application.status === APPLICATION_STATUSES.pending ? (
                  <>
                    <ButtonInput value="Accept" color={COLORS.lightGreen} margin="0px 5px" onClick={onAcceptApplication}/>
                    <ButtonInput value="Decline" color={COLORS.red} margin="0px 5px" onClick={onDeclineApplication}/>
                  </>
                ) : (
                  <ButtonInput value="Delete" color={COLORS.red} margin="0px 5px" width="100px" onClick={onDeleteApplication}/>
                )}
              </Buttons>
          </div>
        </ApplicationBox>
      </ApplicationWrapper>
    </SectionWrapper>
  )
}

export default SingleApplication
