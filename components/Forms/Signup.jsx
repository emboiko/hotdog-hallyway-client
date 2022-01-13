import React from "react"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import SimpleInput from "~/components/Inputs/SimpleInput"
import {observer} from "mobx-react"

const FormWrapper = styled.form`
  border-radius: 5px;
  box-shadow: 5px 5px 5px 1px #000000;
  background: #181A1B;
  position: absolute;
  right: calc(50% - 200px);
  top: 50%;
  z-index: 10;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
`

const InputWrapper = styled.div`
  margin: 5px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginHeader = styled.span`
  font-size: 25px;
  align-self: flex-start;
  margin-left: 20px;
`

const mapStore = store => ({
  characterName: store.auth.characterName,
  setCharacterName: store.auth.setCharacterName,
  discordUsername: store.auth.discordUsername,
  setDiscordUsername: store.auth.setDiscordUsername,
  password: store.auth.password,
  setPassword: store.auth.setPassword,
  signup: store.auth.signup
})

const SignupForm = observer(() => {
  const { characterName, setCharacterName, password, setPassword, discordUsername, setDiscordUsername, signup } = useInject(mapStore)

  const onChangeCharacterName = (event) => {
    setCharacterName(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onChangeDiscordUsername = (event) => {
    setDiscordUsername(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    signup({characterName, discordUsername, password})
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      <LoginHeader>Signup</LoginHeader>
      <InputWrapper>
        <SimpleInput name="Character-Name" type="text" placeHolder="Character Name" value={characterName} onChange={onChangeCharacterName} />
      </InputWrapper>
      <InputWrapper>
        <SimpleInput name="Discord-Username" type="text" placeHolder="Discord #Username" value={discordUsername} onChange={onChangeDiscordUsername} />
      </InputWrapper>
      <InputWrapper>
        <SimpleInput name="Password" type="password" placeHolder="Password" value={password} onChange={onChangePassword} />
      </InputWrapper>
      <InputWrapper>
        <SimpleInput type="submit" />
      </InputWrapper>
    </FormWrapper>
  )
})

export default SignupForm
