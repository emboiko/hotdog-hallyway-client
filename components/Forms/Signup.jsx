import React, { useRef, useState } from "react"
import { observer} from "mobx-react"
import ReCAPTCHA from "react-google-recaptcha"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import TextInput from "~/components/Inputs/TextInput"
import ButtonInput from "~/components/Inputs/ButtonInput"
import { COLORS } from "~/utilities/constants.js"
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
  color: #FFFFFF;
  width: 90%;
`

const SignupSubheader = styled.div`
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
  discordUsername: store.auth.discordUsername,
  setDiscordUsername: store.auth.setDiscordUsername,
  password: store.auth.password,
  setPassword: store.auth.setPassword,
  signup: store.auth.signup,
  signupError: store.auth.signupError,
  setSignupError: store.auth.setSignupError,
  setLoginModalShowing: store.ui.setLoginModalShowing,
  setSignupModalShowing: store.ui.setSignupModalShowing,
  innerWidth: store.ui.innerWidth
})

const SignupForm = observer(({successCB}) => {
  const { 
    username, setUsername, 
    password, setPassword, 
    discordUsername, setDiscordUsername, 
    signup, signupError, setSignupError,
    setLoginModalShowing, setSignupModalShowing,
    innerWidth
  } = useInject(mapStore)

  const recaptchaRef = useRef(null)

  const [ submitButtonEnabled, setSubmitButtonEnabled ] = useState(false)

  const onChangeUsername = (event) => {
    setSignupError("")
    setUsername(event.target.value)
    if (event.target.value && discordUsername && password) setSubmitButtonEnabled(true)
    else {
      setSubmitButtonEnabled(false)
      if (!event.target.value) setSignupError("Username is required.")
    }
  }

  const onChangePassword = (event) => {
    setSignupError("")
    setPassword(event.target.value)
    if (username && discordUsername && event.target.value) setSubmitButtonEnabled(true)
    else {
      setSubmitButtonEnabled(false)
      if (!event.target.value) setSignupError("Password is required.")
    }
  }

  const onChangeDiscordUsername = (event) => {
    setSignupError("")
    setDiscordUsername(event.target.value)
    if (username && event.target.value && password) setSubmitButtonEnabled(true)
    else {
      setSubmitButtonEnabled(false)
      if (!event.target.value) setSignupError("Discord Username is required.")
    }
  }

  const usernameError = validateUsername(username)
  const passwordError = validatePassword(password)
  const discordUsernameError = validateDiscordUsername(discordUsername)
  const validationError = usernameError || passwordError || discordUsernameError || signupError

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validationError) return
    if (!username || !discordUsername || !password) return
    const captchaToken = await recaptchaRef.current.executeAsync()
    recaptchaRef.current.reset()
    if (captchaToken) {
      console.log("Captcha Success")
      const user = await signup({username, discordUsername, password})
      if (user) {
        successCB()
      }
    }
    console.log("Captcha Failure")
  }

  const swapModals = () => {
    setSignupModalShowing(false)
    setSignupError("")
    setLoginModalShowing(true)
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      <SignupHeader>Sign up</SignupHeader>
      <SignupSubheader>
        {
          innerWidth < 270 ? <>
            Or <MockLink onClick={swapModals}>Log In.</MockLink>
          </> : <>
            Already have an account? <MockLink onClick={swapModals}>Click here.</MockLink>
          </>
        }
      </SignupSubheader>
      <InputWrapper>
        <TextInput name="Username" type="text" placeHolder="Character Name" value={username} onChange={onChangeUsername} />
      </InputWrapper>
      <InputWrapper>
        <TextInput name="Discord-Username" type="text" placeHolder="Discord #Username" value={discordUsername} onChange={onChangeDiscordUsername} />
      </InputWrapper>
      <InputWrapper>
        <TextInput name="Password" type="password" placeHolder="Password" value={password} onChange={onChangePassword} />
      </InputWrapper>
      <ErrorContainer>{validationError}</ErrorContainer>
      <ReCAPTCHA
        theme="dark"
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.RECAPTCHA_SITE_KEY}
      />
      <InputWrapper>
        <ButtonInput value="Submit" width="85px" disabled={validationError || !submitButtonEnabled} />
      </InputWrapper>
    </FormWrapper>
  )
})

export default SignupForm
