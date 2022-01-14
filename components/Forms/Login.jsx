import React from "react"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import TextInput from "~/components/Inputs/TextInput"
import ButtonInput from "~/components/Inputs/ButtonInput"
import { observer } from "mobx-react"

const FormWrapper = styled.form`
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

const LoginHeader = styled.div`
  font-size: 25px;
  align-self: flex-start;
  margin-left: 20px;
  color: #FFFFFF;
`

const LoginSubheader = styled.div`
  font-size: 16px;
  align-self: flex-start;
  margin-left: 20px;
  color: #FFFFFF;
`

const ErrorContainer = styled.div`
  color: red;
  min-height: 30px;
`

const MockLink = styled.span`
  color: aqua;
  &:hover {
    cursor: pointer;
  }
`

const mapStore = store => ({
  username: store.auth.username,
  setUsername: store.auth.setUsername,
  password: store.auth.password,
  setPassword: store.auth.setPassword,
  login: store.auth.login,
  loginError: store.auth.loginError,
  setLoginError: store.auth.setLoginError,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
})

const LoginForm = observer(({successCB}) => {
  const { 
    username, setUsername, 
    password, setPassword, 
    login, loginError, setLoginError,
    setLoginModalShowing, setSignupModalShowing 
  } = useInject(mapStore)

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const user = await login({username, password})
    if (user) {
      successCB()
    }
  }

  const swapModals = () => {
    setLoginModalShowing(false)
    setLoginError("")
    setSignupModalShowing(true)
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      <LoginHeader>Login</LoginHeader>
      <LoginSubheader>Need an account? <MockLink onClick={swapModals}>Click here.</MockLink></LoginSubheader>
      <InputWrapper>
        <TextInput name="Username" type="text" placeHolder="Username" value={username} onChange={onChangeUsername} />
      </InputWrapper>
      <InputWrapper>
        <TextInput name="Password" type="password" placeHolder="Password" value={password} onChange={onChangePassword} />
      </InputWrapper>
      <ErrorContainer>{loginError}</ErrorContainer>
      <InputWrapper>
        <ButtonInput value="Submit" width="85px" />
      </InputWrapper>
    </FormWrapper>
  )
})

export default LoginForm
