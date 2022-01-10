import React from "react"
import styled from "styled-components"

const Header = styled.div`
  background: #181A1B;
  color: #FFFFFF;
`

const MainHeader = () => {
  return (
    <Header>
      I'm a page header, and I'm not sticky.
    </Header>
  )
}

export default MainHeader
