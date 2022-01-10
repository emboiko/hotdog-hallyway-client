import React from "react"
import styled from "styled-components"

const Footer = styled.div`
  background: #181A1B;
  color: #FFFFFF;
`

const MainFooter = () => {
  return (
    <Footer>
      I'm a page footer, and I'm always beneath the fold.
    </Footer>
  )
}

export default MainFooter
