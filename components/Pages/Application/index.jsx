import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import Image from "next/image"
import Router from "next/router"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import TextInput from "~/components/Inputs/TextInput"
import SelectInput from "~/components/Inputs/SelectInput"
import ToggleInput from "~/components/Inputs/ToggleInput"
import TextAreaInput from "~/components/Inputs/TextAreaInput"
import ButtonInput from "~/components/Inputs/ButtonInput"
import HotDogStand from "/public/static/img/jpg/hotdogstand3.jpg"
import { validateUsername } from "~/utilities/userValidations.js"
import { 
  COLORS, 
  PLAYER_CLASSES, 
  PLAYER_SPECIALIZATIONS, 
  APPLICATION_STATUSES 
} from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const ApplicationWrapper = styled.div`
  position: relative;
  margin-top: 75px;
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
  width: 500px;
  margin-bottom: 25px;
  position: relative;
  background: rgba(0,0,0,0.8);
`

const ApplicationBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  width: 50%;
  background: ${COLORS.darkGrey};
  opacity: 0.975;
  min-width: 500px;
  max-width: 1800px;
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
`

const ApplicationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`

const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`

const QuestionText = styled.div`
  font-size: 18px;
  width: 100%;
  margin-bottom: 5px;
`

const QuestionTextCentered = styled.div`
  font-size: 18px;
  width: 100%;
  margin-bottom: 5px;
  text-align: center;
`

const CheckboxWrapper = styled.div`
  align-self: flex-start;
  width: 100%;
`

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Error = styled.div`
  color: red;
  min-height: 20px;
  margin-top: 10px;
`

const HorizontalFormBlock = styled.div`
  display: flex;
  width: 90%;
`

const VerticalFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`

const SuccessText = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`

const SuccessSubtext = styled.div`
  font-size: 20px;
`

const AlreadySubmittedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`

const AlreadySubmittedText = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`

const AlreadySubmittedSubText = styled.div`
  font-size: 20px;
`

const ApplicationStatusText = styled.div`
  display: inline-block;
  color: ${props => {
    if (props.status === APPLICATION_STATUSES.pending) return COLORS.yellow
    if (props.status === APPLICATION_STATUSES.accepted) return COLORS.lightGreen
    if (props.status === APPLICATION_STATUSES.declined) return COLORS.red
    return "#FFFFFF"
  }}
`

const mapStore = store => ({
  username: store.auth.user.username,
  submitApplication: store.auth.user.submitApplication,
  applicationSubmissionError: store.auth.user.applicationSubmissionError,
  applicationID: store.auth.user.applicationID,
  setApplicationID: store.auth.user.setApplicationID,
  getApplicationStatus: store.auth.user.getApplicationStatus
})

const GuildApplication = observer(() => {

  const { 
    username, 
    submitApplication, 
    applicationSubmissionError, 
    applicationID,
    setApplicationID,
    getApplicationStatus
  } = useInject(mapStore)

  const [playerCharacterName, setPlayerCharacterName] = useState(username)
  const [playerClass, setPlayerClass] = useState("Druid")
  const [playerSpecialization, setPlayerSpecialization] = useState("Balance")
  const [playerRace, setPlayerRace] = useState("Tauren")
  
  const [playerInterestedInRaiding, setPlayerInterestedInRaiding] = useState(false)
  const [playerAgreedToRaidTimes, setPlayerAgreedToRaidTimes] = useState(false)
  const [playerAgreedToLootCouncil, setPlayerAgreedToLootCouncil] = useState(false)
  const [playerAgreedToAttendancePolicy, setPlayerAgreedToAttendancePolicy] = useState(false)
  const [playerAgreedToGemsAndEnchants, setPlayerAgreedToGemsAndEnchants] = useState(false)
  const [playerAgreedToWorkingMicrophone, setPlayerAgreedToWorkingMicrophone] = useState(false)
  const [playerRaidUtility, setPlayerRaidUtility] = useState("")

  const [playerInterestedInPvP, setPlayerInterestedInPvP] = useState(false)
  const [playerAdditionalInfo, setPlayerAdditionalInfo] = useState("")
  
  const [renderingSuccess, setRenderingSuccess] = useState(false)

  const [applicationStatus, setApplicationStatus] = useState("Loading...")

  const onChangePlayerCharacterName = (event) => {
    if (event.target.value.length > 15) return
    setPlayerCharacterName(event.target.value)
  }
  const onChangePlayerClass = (event) => {
    setPlayerClass(event.target.value)
  }
  const onChangePlayerSpecialization = (event) => {
    setPlayerSpecialization(event.target.value)
  }
  const onChangePlayerRace = (event) => {
    setPlayerRace(event.target.value)
  }

  const onChangePlayerInterestedInRaiding = () => {
    setPlayerInterestedInRaiding(!playerInterestedInRaiding)
  }
  const onChangePlayerAgreedToRaidTimes = () => {
    setPlayerAgreedToRaidTimes(!playerAgreedToRaidTimes)
  }
  const onChangePlayerAgreedToLootCouncil = () => {
    setPlayerAgreedToLootCouncil(!playerAgreedToLootCouncil)
  }
  const onChangePlayerAgreedToAttendancePolicy = () => {
    setPlayerAgreedToAttendancePolicy(!playerAgreedToAttendancePolicy)
  }
  const onChangePlayerAgreedToGemsAndEnchants = () => {
    setPlayerAgreedToGemsAndEnchants(!playerAgreedToGemsAndEnchants)
  }
  const onChangePlayerAgreedToWorkingMicrophone = () => {
    setPlayerAgreedToWorkingMicrophone(!playerAgreedToWorkingMicrophone)
  }
  const onChangePlayerRaidUtility = (event) => {
    setPlayerRaidUtility(event.target.value)
  }


  const onChangePlayerInterestedInPvP = () => {
    setPlayerInterestedInPvP(!playerInterestedInPvP)
  }
  const onChangePlayerAdditionalInfo = (event) => {
    setPlayerAdditionalInfo(event.target.value)
  }

  const usernameError = validateUsername(playerCharacterName)
  const error = usernameError || applicationSubmissionError

  const onFormSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      playerCharacterName,
      playerClass,
      playerSpecialization,
      playerRace,
      playerInterestedInRaiding,
      playerAgreedToRaidTimes,
      playerAgreedToLootCouncil,
      playerAgreedToAttendancePolicy,
      playerAgreedToGemsAndEnchants,
      playerAgreedToWorkingMicrophone,
      playerRaidUtility,
      playerInterestedInPvP,
      playerAdditionalInfo
    }

    const responseID = await submitApplication(payload)
    if (responseID) {
      setRenderingSuccess(true)
      setTimeout(() => {
        Router.push("/")
        setApplicationID(responseID)
      }, 4000)
    }
  }

  const alreadySubmitted = !!applicationID

  useEffect(async () => {
    if (alreadySubmitted) {
      const status = await getApplicationStatus()
      setApplicationStatus(status)
    }
  })

  const RenderAlreadySubmitted = (
    <AlreadySubmittedWrapper>
      <AlreadySubmittedText>
        Application already submitted.
      </AlreadySubmittedText>
      <AlreadySubmittedSubText>
        Status: <ApplicationStatusText status={applicationStatus}>{applicationStatus}</ApplicationStatusText>
      </AlreadySubmittedSubText>
    </AlreadySubmittedWrapper>
  )

  const RenderSuccess = (
    <SuccessWrapper>
      <SuccessText>Application submitted.</SuccessText>
      <SuccessSubtext>
        Thanks for applying to {"<Hotdog Hallway>"}.
      </SuccessSubtext>
      <SuccessSubtext>
        We will contact you on Discord.
      </SuccessSubtext>
    </SuccessWrapper>
  )

  const RaidingSections = (
    <VerticalFormBlock>
      <FormSection>
        <QuestionText>
          Please be aware that we raid Saturdays from 8:00 PM - 12:00 AM server time and Sundays 8:00 PM - 11:00 PM server time. Do these hours work for you?
        </QuestionText>
        <CheckboxWrapper>
          <ToggleInput width="25px" height="25px" value={playerAgreedToRaidTimes} checked={playerAgreedToRaidTimes} onChange={onChangePlayerAgreedToRaidTimes} />
        </CheckboxWrapper>
      </FormSection>
      <FormSection>
        <QuestionText>
          We operate a rotating loot council consisting of 3 Core Raiders and 2 Guild Council members. This rotates on a weekly basis. We reference thatsmybis.com to keep up with what gear our raiders need. Do you agree to follow this system if you intend on raiding with us?
        </QuestionText>
        <CheckboxWrapper>
          <ToggleInput width="25px" height="25px" value={playerAgreedToLootCouncil} checked={playerAgreedToLootCouncil} onChange={onChangePlayerAgreedToLootCouncil} />
        </CheckboxWrapper>
      </FormSection>
      <FormSection>
        <QuestionText>
          Core Raiders are expected to maintain an attendance of at least 75%. However, we realize that life can sometimes get in the way, we just ask that you let a Guild Council member know in advance. Do you agree to this?
        </QuestionText>
        <CheckboxWrapper>
          <ToggleInput width="25px" height="25px" value={playerAgreedToAttendancePolicy} checked={playerAgreedToAttendancePolicy} onChange={onChangePlayerAgreedToAttendancePolicy} />
        </CheckboxWrapper>
      </FormSection>
      <FormSection>
        <QuestionText>
          We provide all enchants and gems to our Core Raiders at no cost (If materials are available). Will you do your best to make sure your gear is enchanted/gemmed?
        </QuestionText>
        <CheckboxWrapper>
          <ToggleInput width="25px" height="25px" value={playerAgreedToGemsAndEnchants} checked={playerAgreedToGemsAndEnchants} onChange={onChangePlayerAgreedToGemsAndEnchants} />
        </CheckboxWrapper>
      </FormSection>
      <FormSection>
        <QuestionText>
          Do you have a working microphone and are you willing to speak if needed?
        </QuestionText>
        <CheckboxWrapper>
          <ToggleInput width="25px" height="25px" value={playerAgreedToWorkingMicrophone} checked={playerAgreedToWorkingMicrophone} onChange={onChangePlayerAgreedToWorkingMicrophone} />
        </CheckboxWrapper>
      </FormSection>
      <FormSection>
        <QuestionText>
          In your opinion, what sort of utility do you bring to the raid?
        </QuestionText>
        <TextAreaInput width="100%" value={playerRaidUtility} onChange={onChangePlayerRaidUtility} />
      </FormSection>
    </VerticalFormBlock>
  )

  const OptionalRaidingSection = playerInterestedInRaiding ? RaidingSections : null

  let MainContent

  if (renderingSuccess) MainContent = RenderSuccess
  else if (alreadySubmitted) MainContent = RenderAlreadySubmitted
  else MainContent = (
    <ApplicationForm onSubmit={onFormSubmit}>
      <HorizontalFormBlock>
        <FormSection>
          <QuestionText>Character name:</QuestionText>
          <TextInput value={playerCharacterName} onChange={onChangePlayerCharacterName} width="100%" height="20px" />
        </FormSection>
        <FormSection>
          <QuestionTextCentered>Interested in raiding:</QuestionTextCentered>
          <Centered>
            <CheckboxWrapper>
              <ToggleInput width="25px" height="25px" value={playerInterestedInRaiding} checked={playerInterestedInRaiding} onChange={onChangePlayerInterestedInRaiding} />
            </CheckboxWrapper>
          </Centered>
        </FormSection>
        <FormSection>
          <QuestionTextCentered>Interested in PvP:</QuestionTextCentered>
          <Centered>
            <CheckboxWrapper>
              <ToggleInput width="25px" height="25px" value={playerInterestedInPvP} checked={playerInterestedInPvP} onChange={onChangePlayerInterestedInPvP} />
            </CheckboxWrapper>
          </Centered>
        </FormSection>
      </HorizontalFormBlock>
      <HorizontalFormBlock>
        <FormSection>
          <QuestionText>Class:</QuestionText>
          <SelectInput options={PLAYER_CLASSES} value={playerClass} onChange={onChangePlayerClass} width="100%" />
        </FormSection>
        <FormSection>
          <QuestionText>Specialization:</QuestionText>
          <SelectInput options={PLAYER_SPECIALIZATIONS[playerClass].specializations} value={playerSpecialization} onChange={onChangePlayerSpecialization} width="100%" />
        </FormSection>
        <FormSection>
          <QuestionText>Race:</QuestionText>
          <SelectInput options={PLAYER_SPECIALIZATIONS[playerClass].races} value={playerRace} onChange={onChangePlayerRace} width="100%" />
        </FormSection>
      </HorizontalFormBlock>
      {OptionalRaidingSection}
      <VerticalFormBlock>
        <FormSection>
          <QuestionText>Is there any additional information you'd like to provide us with?</QuestionText>
          <TextAreaInput width="100%" value={playerAdditionalInfo} onChange={onChangePlayerAdditionalInfo} />
        </FormSection>
        <FormSection>
          <Error>{error}</Error>
          <ButtonInput value="Submit" margin="10px 0px 20px 0px" width="150px" height="40px" />
        </FormSection>
      </VerticalFormBlock>
    </ApplicationForm>
  )

  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority />
      <ApplicationWrapper>
        <MainHeader>
          Guild Application
        </MainHeader>
        <ApplicationBox>
          {MainContent}
        </ApplicationBox>
      </ApplicationWrapper>
    </SectionWrapper>
  )
})

export default GuildApplication
