import React from "react"
import styled from "styled-components"

const Input = styled.input`
  width: ${props => props.width || "90%"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  color: ${props => props.color || "initial"};
  background: ${props => props.background || "#FFFFFF"};
`

const TextInput = ({value, disabled, type, placeHolder, onChange, width, fontSize, margin, color, background}) => (
  <Input 
    type={type} 
    placeholder={placeHolder} 
    onChange={onChange}
    width={width}
    fontSize={fontSize}
    margin={margin}
    value={value}
    disabled={disabled}
    color={color}
    background={background}
  />
)

export default TextInput
