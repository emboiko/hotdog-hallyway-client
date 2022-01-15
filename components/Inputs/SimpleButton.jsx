import React from "react"
import styled from "styled-components"
import { COLORS } from "~/utilities/constants.js"

const Button = styled.button`
  width: ${props => props.width || "90%"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  background: transparent;
  color: #FFFFFF;
  cursor: pointer;
  border: 1px solid ${COLORS.accentBlue};
  border-radius: 5px;
`

const SimpleButton = ({children, onClick, width, fontSize, margin}) => (
  <Button 
    onClick={onClick}
    width={width}
    fontSize={fontSize}
    margin={margin}
  >
    {children}
  </Button>
)

export default SimpleButton
