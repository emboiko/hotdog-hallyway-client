import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import Router from "next/router"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import SimpleButton from "~/components/Inputs/SimpleButton"
import TextInput from "~/components/Inputs/TextInput"
import ButtonInput from "~/components/Inputs/ButtonInput"
import HotDogStand from "/public/static/img/jpg/hotdogstand5.jpg"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"
import EditIcon from "~/public/static/img/png/edit.png"
import { validateUsername, validatePassword, validatePasswordConfirmation, validateDiscordUsername } from "~/utilities/userValidations"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const AccountWrapper = styled.div`
  position: relative;
  margin-top: 65px;
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
  width: 350px;
  margin-bottom: 25px;
  position: relative;
  background: rgba(0,0,0,0.8);
  @media (max-width: ${UI_SIZES.small}px) {
    font-size: 48px;
    margin-bottom: 12px;
    width: 100%;
  }
`

const AccountBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  width: 70%;
  background: ${COLORS.darkGrey};
  opacity: 0.975;
  min-width: 500px;
  max-width: 1000px;
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
  justify-content: center;
  @media (max-width: ${UI_SIZES.medium}px) {
    flex-direction: column;
    align-items: center;
    height: initial;
    min-width: 90%;
  }
`

const AvatarContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  text-align: center;
  @media (max-width: ${UI_SIZES.medium}px) {
    border-right: none;
    margin-bottom: 25px;
  }
`

const UnderConstruction = styled.div`
  @media (max-width: ${UI_SIZES.tiny}px) {
    display: none;
  }
  margin: 5px 10px;
`

const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: ${UI_SIZES.medium}px) {
    width: 100%;
  }
`

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const TextInputLabel = styled.div`
  width: 80%;
  margin-bottom: 5px;
  font-size: 20px;
`

const FormGroup = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
  width: 90%;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`

const EditButton = styled.div`
  background: ${props => props.editing ? COLORS.yellow : COLORS.lightGreen};
  border: 2px solid ${props => props.editing ? COLORS.yellow : COLORS.lightGreen};
  width: 22px;
  height: 22px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  margin-bottom: 1px;
`

const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 50%;
  margin-bottom: 15px;
  max-width: 300px;
`

const MessageContainer = styled.div`
  color: ${props => props.isErrorMessage ? "red" : "green"};
  min-height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const mapStore = store => ({
  username: store.auth.user.username,
  setUsername: store.auth.user.setUsername,
  discordUsername: store.auth.user.discordUsername,
  setDiscordUsername: store.auth.user.setDiscordUsername,
  updateUser: store.auth.user.updateUser,
  accountUpdateError: store.auth.user.accountUpdateError,
  logout: store.auth.logout,
  isSmall: store.ui.isSmall
})


const Account = observer(() => {
  const { 
    username, setUsername ,
    discordUsername, setDiscordUsername,
    updateUser,
    accountUpdateError,
    logout,
  } = useInject(mapStore)


  const [isEditingUsernames, setIsEditingUsernames] = useState(false)
  const [isEditingPasswords, setIsEditingPasswords] = useState(false)

  const [localUsername, setLocalUsername] = useState("")
  const [localDiscordUsername, setLocalDiscordUsername] = useState("")

  const [localPassword, setLocalPassword] = useState("")
  const [localPasswordConfirmation, setLocalPasswordConfirmation] = useState("")

  const [message, setMessage] = useState("")

  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)

  const usernameError = validateUsername(localUsername)
  const discordUsernameError = validateDiscordUsername(localDiscordUsername)
  const passwordError = validatePassword(localPassword)
  const passwordConfirmationError = validatePasswordConfirmation(localPassword, localPasswordConfirmation)
  const validationError = usernameError || discordUsernameError || passwordError || passwordConfirmationError

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validationError) return

    const payload = {}

    if (localUsername && localUsername !== username) {
      setUsername(localUsername)
      payload.username = localUsername
    }

    if (localDiscordUsername && localDiscordUsername !== discordUsername) {
      setDiscordUsername(localDiscordUsername)
      payload.discordUsername = localDiscordUsername
    }

    if (localPassword && localPasswordConfirmation) {
      payload.password = localPassword
    }

    let success
    if (Object.keys(payload).length) {
      success = await updateUser(payload)
    }

    if (success) {
      setIsEditingUsernames(false)
      setIsEditingPasswords(false)
      setSubmitButtonEnabled(false)
      setMessage("Success.")
      setTimeout(() => {
        setMessage("")
      }, 3000)
    } // Otherwise the authStore sets "accountUpdateError" which is rendered in the DOM below in this component.

  }

  const onChangeLocalUsername = (event) => {
    setSubmitButtonEnabled(true)
    setLocalUsername(event.target.value)
  }

  const onChangeLocalDiscordUsername = (event) => {
    setSubmitButtonEnabled(true)
    setLocalDiscordUsername(event.target.value)
  }
  
  const onChangeLocalPassword = (event) => {
    setSubmitButtonEnabled(true)
    setLocalPassword(event.target.value)
  }

  const onChangeLocalPasswordConfirmation = (event) => {
    setLocalPasswordConfirmation(event.target.value)
  }

  const handleLogout = () => {
    logout()
    Router.push("/")
  }

  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority />
      <AccountWrapper>
        <MainHeader>
          Account
        </MainHeader>
        <AccountBox>
          <AvatarContainer>
            <UnderConstruction>
              User Avatars &amp; Image Uploads Coming Soon.
              <br/><br/>
              Under Construction
            </UnderConstruction>
          </AvatarContainer>
          <FormContainer>
            <AccountForm onSubmit={onSubmit}>
              <FormGroup>
                <InputGroup>
                  <TextInputLabel>Username</TextInputLabel>
                  <TextInput 
                    width="80%" 
                    name="Username" 
                    type="text" 
                    fontSize="20px"
                    value={localUsername || username} 
                    onChange={onChangeLocalUsername} 
                    disabled={!isEditingUsernames}
                    background={isEditingUsernames ? "#FFFFFF" : "#333333"}
                  />
                </InputGroup>
                <EditButton onClick={() => {setIsEditingUsernames(!isEditingUsernames)}} editing={isEditingUsernames}>
                  <Image src={EditIcon} layout="fill" />
                </EditButton>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <TextInputLabel>Discord Username</TextInputLabel>
                  <TextInput 
                    width="80%" 
                    fontSize="20px"
                    name="Discord-Username" 
                    type="text" 
                    value={localDiscordUsername || discordUsername} 
                    onChange={onChangeLocalDiscordUsername} 
                    disabled={!isEditingUsernames}
                    background={isEditingUsernames ? "#FFFFFF" : "#333333"}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <TextInputLabel>Password</TextInputLabel>
                  <TextInput 
                    width="80%" 
                    fontSize="20px"
                    name="Password" 
                    type="password" 
                    value={localPassword} 
                    onChange={onChangeLocalPassword} 
                    disabled={!isEditingPasswords}
                    background={isEditingPasswords ? "#FFFFFF" : "#333333"}
                    />
                </InputGroup>
                <EditButton onClick={() => {setIsEditingPasswords(!isEditingPasswords)}} editing={isEditingPasswords}>
                  <Image src={EditIcon} layout="fill" />
                </EditButton>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <TextInputLabel>Confirm Password</TextInputLabel>
                  <TextInput 
                    width="80%" 
                    fontSize="20px"
                    name="Password-Confirm" 
                    type="password" 
                    value={localPasswordConfirmation} 
                    onChange={onChangeLocalPasswordConfirmation} 
                    disabled={!isEditingPasswords}
                    background={isEditingPasswords ? "#FFFFFF" : "#333333"} 
                    />
                </InputGroup>
              </FormGroup>
              <MessageContainer isErrorMessage={!message.length}>{validationError || accountUpdateError || message}</MessageContainer>
              <FormButtonContainer>
                <ButtonInput value="Update" disabled={validationError || !submitButtonEnabled} />
                <SimpleButton 
                  onClick={handleLogout}
                  margin="10px 0px 0px 0px"
                >
                Logout
                </SimpleButton>
              </FormButtonContainer>
            </AccountForm>
          </FormContainer>
        </AccountBox>
      </AccountWrapper>
    </SectionWrapper>
  )
})

export default Account
