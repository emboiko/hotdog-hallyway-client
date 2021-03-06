import React from "react"
import styled from "styled-components"
import { COLORS } from "~/utilities/constants.js"

const Button = styled.input`
  width: ${props => props.width || "90%"};
  height: ${props => props.height || "initial"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  background: ${props => props.background || "transparent"};
  color: ${props => props.disabled ? "#333333" : (props.color || "#FFFFFF")};
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  border: ${props => props.disabled ? "1px solid #333333" : `1px solid ${COLORS.accentBlue}`};
  border-radius: 5px;
  background-image: none !important;
`

const ButtonInput = ({value, children, width, height, fontSize, margin, disabled, background, color, onClick}) => (
  <Button 
    type="submit"
    value={value || children}
    width={width}
    height={height}
    fontSize={fontSize}
    margin={margin}
    disabled={disabled}
    background={background}
    color={color}
    onClick={onClick}
  />
)

export default ButtonInput
