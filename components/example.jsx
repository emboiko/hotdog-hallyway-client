import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Cone from "/public/static/img/png/cone.png"
import Hotdog from "/public/static/img/png/hotdog.png"
import Image from "next/image"
import axios from "axios"

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TestMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const MainHeader = styled.h1`
  text-align: center;
`

const SubHeader = styled.h2`
  text-align: center;
`

const ExampleComponent = () => {
  const [testMessage, setTestMessage] = useState("")

  useEffect(async () => {
    console.log(process.env)
    try {
      const res = await axios.get(`${process.env.BACKEND_URL}/test`)
      setTestMessage(res.data.message)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <MainHeader>{"<Hotdog Hallway>"}</MainHeader>
      <SubHeader>Under Construction</SubHeader>
      <ImageWrapper>
        <Image src={Cone} width={90} height={90} />
        <Image src={Hotdog} width={90} height={90} />
        <Image src={Cone} width={90} height={90} />
      </ImageWrapper>
      <TestMessageWrapper>
        {testMessage ? (
          <>{`(${testMessage})`}</>
        ) : null}
      </TestMessageWrapper>
    </>
  )
}

export default ExampleComponent
