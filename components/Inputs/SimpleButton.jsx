import React from "react"
import styled from "styled-components"
import { COLORS } from "~/utilities/constants.js"

const Button = styled.button`
  width: ${props => props.width || "90%"};
  height: ${props => props.height || "initial"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  padding: ${props => props.padding || "none"};
  background: transparent;
  color: #FFFFFF;
  cursor: pointer;
  border: 1px solid ${COLORS.accentBlue};
  border-radius: 5px;
  transition: box-shadow .25s;
  &:hover {
    box-shadow: 0px 0px 1px 1px ${COLORS.accentBlue};
  }
`

const SimpleButton = ({children, onClick, width, fontSize, margin, height, padding}) => (
  <Button 
    onClick={onClick}
    width={width}
    fontSize={fontSize}
    margin={margin}
    height={height}
    padding={padding}
  >
    {children}
  </Button>
)

export default SimpleButton
