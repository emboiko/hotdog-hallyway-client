import React from "react"
import styled from "styled-components"
import { COLORS } from "~/utilities/constants.js"

const Button = styled.input`
  width: ${props => props.width || "90%"};
  height: ${props => props.height || "initial"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  background: transparent;
  color: ${props => props.disabled ? "#333333" : (props.color || "#FFFFFF")};
  cursor: pointer;
  border: ${props => props.disabled ? "1px solid #333333" : `1px solid ${COLORS.accentBlue}`};
  border-radius: 5px;
`

const ButtonInput = ({value, children, width, height, fontSize, margin, disabled}) => (
  <Button 
    type="submit"
    value={value || children}
    width={width}
    height={height}
    fontSize={fontSize}
    margin={margin}
    disabled={disabled}
  />
)

export default ButtonInput
