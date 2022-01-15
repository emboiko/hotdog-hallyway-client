import React from "react"
import styled from "styled-components"
import { COLORS } from "~/utilities/constants.js"

const Button = styled.input`
  width: ${props => props.width || "90%"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  background: transparent;
  color: #FFFFFF;
  cursor: pointer;
  border: 1px solid ${COLORS.accentBlue};
  border-radius: 5px;
`

const ButtonInput = ({value, children, width, fontSize, margin}) => (
  <Button 
    type="submit"
    value={value || children}
    width={width}
    fontSize={fontSize}
    margin={margin}
  />
)

export default ButtonInput
