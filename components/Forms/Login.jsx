import React from "react"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import SimpleInput from "~/components/Inputs/SimpleInput"
import { observer } from "mobx-react"

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
  password: store.auth.password,
  setPassword: store.auth.setPassword,
  login: store.auth.login
})

const LoginForm = observer(() => {
  const { characterName, setCharacterName, password, setPassword, login } = useInject(mapStore)

  const onChangeCharacterName = (event) => {
    setCharacterName(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    login({characterName, password})
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      <LoginHeader>Login</LoginHeader>
      <InputWrapper>
        <SimpleInput name="Character-Name" type="text" placeHolder="Character Name" value={characterName} onChange={onChangeCharacterName} />
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

export default LoginForm
