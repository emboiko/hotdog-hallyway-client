import React, {useState} from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import TextInput from "~/components/Inputs/TextInput"
import ButtonInput from "~/components/Inputs/ButtonInput"
import { COLORS } from "~/utilities/constants.js"
import { validateUsername, validatePassword } from "~/utilities/userValidations"

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
  color: #FFFFFF;
  width: 90%;
`

const LoginSubheader = styled.div`
  font-size: 16px;
  color: #FFFFFF;
  width: 90%;
`

const ErrorContainer = styled.div`
  color: red;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MockLink = styled.span`
  color: ${COLORS.accentBlue};
  cursor: pointer;
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
  innerWidth: store.ui.innerWidth
})

const LoginForm = observer(({successCB}) => {
  const { 
    username, setUsername, 
    password, setPassword, 
    login, loginError, setLoginError,
    setLoginModalShowing, setSignupModalShowing,
    innerWidth
  } = useInject(mapStore)

  const [ submitButtonEnabled, setSubmitButtonEnabled ] = useState(false)

  const onChangeUsername = (event) => {
    setLoginError("")
    setUsername(event.target.value)
    if (event.target.value && password) setSubmitButtonEnabled(true)
    else {
      setSubmitButtonEnabled(false)
      if (!event.target.value) setLoginError("Username is required.")
    }
  }

  const onChangePassword = (event) => {
    setLoginError("")
    setPassword(event.target.value)
    if (event.target.value && username) setSubmitButtonEnabled(true)
    else {
      setSubmitButtonEnabled(false)
      if (!event.target.value) setLoginError("Password is required.")
    }
  }

  const usernameError = validateUsername(username)
  const passwordError = validatePassword(password)
  const validationError = usernameError || passwordError || loginError

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validationError) return
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
      <LoginSubheader>
        {
          innerWidth < 270 ? <>
            Or <MockLink onClick={swapModals}>Sign Up.</MockLink>
          </> : <>
            Need an account? <MockLink onClick={swapModals}>Click here.</MockLink>
          </>
        }
      </LoginSubheader>
      <InputWrapper>
        <TextInput name="Username" type="text" placeHolder="Username" value={username} onChange={onChangeUsername} />
      </InputWrapper>
      <InputWrapper>
        <TextInput name="Password" type="password" placeHolder="Password" value={password} onChange={onChangePassword} />
      </InputWrapper>
      <ErrorContainer>{validationError}</ErrorContainer>
      <InputWrapper>
        <ButtonInput value="Submit" width="85px" disabled={validationError || !submitButtonEnabled}/>
      </InputWrapper>
    </FormWrapper>
  )
})

export default LoginForm
