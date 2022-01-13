import React from "react"
import styled from "styled-components"

const Header = styled.div`
  background: #181A1B;
  color: #FFFFFF;
  height: 30px;
`

// Todo
const MainHeader = ({user}) => {
  return (
    <Header className="font-oswald">
      {"Logged in as: "}
      {user?.characterName || "Guest"}
    </Header>
  )
}

export default MainHeader
