import React from "react"
import styled from "styled-components"
import Cone from "/public/static/img/png/cone.png"
import Hotdog from "/public/static/img/png/hotdog.png"
import Image from "next/image"

const Wrapper = styled.div`

`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainHeader = styled.h1`
  text-align: center;
`

const SubHeader = styled.h2`
  text-align: center;
`

const ExampleComponent = () => {
  return (
    <Wrapper>
      <MainHeader>{"<Hotdog Hallway>"}</MainHeader>
      <SubHeader>Under Construction</SubHeader>
      <ImageWrapper>
        <Image src={Cone} width={90} height={90} />
        <Image src={Hotdog} width={90} height={90} />
        <Image src={Cone} width={90} height={90} />
      </ImageWrapper>
    </Wrapper>
  )
}

export default ExampleComponent
