import React from "react"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import TextInput from "~/components/Inputs/TextInput"
import ButtonInput from "~/components/Inputs/ButtonInput"
import { observer} from "mobx-react"
import { validateUsername, validatePassword, validateDiscordUsername } from "~/utilities/userValidations"


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

const SignupHeader = styled.span`
  font-size: 25px;
  align-self: flex-start;
  margin-left: 20px;
  color: #FFFFFF;
`

const SignupSubheader = styled.div`
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
  discordUsername: store.auth.discordUsername,
  setDiscordUsername: store.auth.setDiscordUsername,
  password: store.auth.password,
  setPassword: store.auth.setPassword,
  signup: store.auth.signup,
  signupError: store.auth.signupError,
  setSignupError: store.auth.setSignupError,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
})

const SignupForm = observer(({successCB}) => {
  const { 
    username, setUsername, 
    password, setPassword, 
    discordUsername, setDiscordUsername, 
    signup, signupError, setSignupError,
    setLoginModalShowing, setSignupModalShowing
  } = useInject(mapStore)

  const onChangeUsername = (event) => {
    setSignupError("")
    setUsername(event.target.value)
  }

  const onChangePassword = (event) => {
    setSignupError("")
    setPassword(event.target.value)
  }

  const onChangeDiscordUsername = (event) => {
    setSignupError("")
    setDiscordUsername(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const user = await signup({username, discordUsername, password})
    if (user) {
      successCB()
    }
  }

  const swapModals = () => {
    setSignupModalShowing(false)
    setSignupError("")
    setLoginModalShowing(true)
  }

  const usernameError = validateUsername(username)
  const passwordError = validatePassword(password)
  const discordUsernameError = validateDiscordUsername(discordUsername)
  const error = usernameError || passwordError || discordUsernameError || signupError

  return (
    <FormWrapper onSubmit={onSubmit}>
      <SignupHeader>Sign up</SignupHeader>
      <SignupSubheader>Have an account already? <MockLink onClick={swapModals}>Sign in.</MockLink></SignupSubheader>
      <InputWrapper>
        <TextInput name="Username" type="text" placeHolder="Character Name" value={username} onChange={onChangeUsername} />
      </InputWrapper>
      <InputWrapper>
        <TextInput name="Discord-Username" type="text" placeHolder="Discord #Username" value={discordUsername} onChange={onChangeDiscordUsername} />
      </InputWrapper>
      <InputWrapper>
        <TextInput name="Password" type="password" placeHolder="Password" value={password} onChange={onChangePassword} />
      </InputWrapper>
      <ErrorContainer>{error}</ErrorContainer>
      <InputWrapper>
        <ButtonInput value="Submit" width="85px" />
      </InputWrapper>
    </FormWrapper>
  )
})

export default SignupForm
