import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import Router from "next/router"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import SimpleButton from "~/components/Inputs/SimpleButton"
import FileInput from "~/components/Inputs/FileInput"
import TextInput from "~/components/Inputs/TextInput"
import ButtonInput from "~/components/Inputs/ButtonInput"
import HotDogStand from "/public/static/img/jpg/hotdogstand5.jpg"
import EditIcon from "~/public/static/img/png/edit.png"
import browseIcon from "~/public/static/img/png/browse.png"
import defaultAvatarImage from "~/public/static/img/png/defaultAvatar.png"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"
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
  @media (max-width: ${UI_SIZES.medium}px) {
    font-size: 48px;
    width: 300px;
    margin-bottom: 15px;

  }
  @media (max-width: ${UI_SIZES.small}px) {
    width: 100%;
  }
`

const AccountBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
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
  flex-direction: column;
  align-items: center;
  @media (max-width: ${UI_SIZES.medium}px) {
    flex-direction: column;
    align-items: center;
    height: initial;
    min-width: 90%;
  }
`

const FormContainer = styled.div`
  height: 100%;
  width: 100%;
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 10px;
`

const EditButton = styled.div`
  background: ${props => props.editing ? (props.error ? COLORS.red : "yellow") : COLORS.lightGreen};
  border: 2px solid ${props => props.editing ? (props.error ? COLORS.red : "yellow") : COLORS.lightGreen};
  width: 15px;
  height: 15px;
  border-radius: 5px;
  position: absolute;
  margin-bottom: 1px;
  top: 0px;
  right: calc(0px + 10%);
  cursor: ${props => props.error ? "not-allowed" : "pointer"};
`

const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
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

const AvatarContainer = styled.div`
  margin-bottom: 15px;
  border-radius: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FileInputIconContainer = styled.div`
  position: absolute;
  left: calc(50% - 40px);
  bottom: 2px;
  z-index: -1;
  background: ${COLORS.accentBlue};
  border-radius: 5px;
  width: 80px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const mapStore = store => ({
  avatarBlob: store.auth.user.avatarBlob,
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
    avatarBlob,
    username, setUsername,
    discordUsername, setDiscordUsername,
    updateUser,
    accountUpdateError,
    logout,
    isSmall
  } = useInject(mapStore)

  const [isEditingUsernames, setIsEditingUsernames] = useState(false)
  const [isEditingPasswords, setIsEditingPasswords] = useState(false)

  const [localAvatarImage, setLocalAvatarImage] = useState(null)
  const [localAvatarFile, setLocalAvatarFile] = useState(null)

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

    if (localAvatarFile) {
      payload.avatar = localAvatarFile
    }

    let success
    if (Object.keys(payload).length) {
      success = await updateUser(payload)
    }

    if (success) {
      setIsEditingUsernames(false)
      setIsEditingPasswords(false)
      setSubmitButtonEnabled(false)
      setLocalAvatarFile(null)
      setLocalAvatarImage(null)
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

  const onChangeLocalAvatar = (event) => {
    if (event.target.name !== "avatar" || !event.target.files.length) return;
    setSubmitButtonEnabled(true)
    setLocalAvatarFile(event.target.files[0])
    setLocalAvatarImage(URL.createObjectURL(event.target.files[0]))
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
          <FormContainer>
            <AccountForm encType="multipart/form-data" onSubmit={onSubmit} onChange={onChangeLocalAvatar}>
                <InputGroup>
                  <TextInputLabel>Avatar</TextInputLabel>
                  <AvatarContainer>
                    <Image src={localAvatarImage || avatarBlob || defaultAvatarImage} alt="avatar" width={isSmall ? 150 : 250} height={isSmall ? 150 : 250}/>
                  </AvatarContainer>
                  <FileInput name="avatar" width="80px" height="50px"/>
                  <FileInputIconContainer>
                    <Image src={browseIcon} alt="browse files" width={40} height={40}/>
                  </FileInputIconContainer>
                </InputGroup>
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
                <EditButton onClick={validationError ? null : () => {setIsEditingUsernames(!isEditingUsernames)}} editing={isEditingUsernames} error={validationError}>
                  <Image src={EditIcon} layout="fill" />
                </EditButton>
                </InputGroup>
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
                <EditButton onClick={() => {setIsEditingPasswords(!isEditingPasswords)}} editing={isEditingPasswords} error={validationError}>
                  <Image src={EditIcon} layout="fill" />
                </EditButton>
                </InputGroup>
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
              <MessageContainer isErrorMessage={!message.length}>{validationError || accountUpdateError || message}</MessageContainer>
              <FormButtonContainer>
                <ButtonInput width="100px" value="Update" disabled={validationError || !submitButtonEnabled} />
                <SimpleButton 
                  onClick={handleLogout}
                  margin="10px 0px 0px 0px"
                  width="100px"
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
