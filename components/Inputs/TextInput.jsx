import React from "react"
import styled from "styled-components"

const Input = styled.input`
  width: ${props => props.width || "90%"};
  height: ${props => props.height || "initial"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  color: ${props => props.color || "initial"};
  background: ${props => props.background || "#FFFFFF"};
  border: none;
  box-sizing: border-box;
  padding-left: 5px;
`

const TextInput = ({value, disabled, type, placeHolder, onChange, width, height, fontSize, margin, color, background}) => (
  <Input 
    type={type} 
    placeholder={placeHolder} 
    onChange={onChange}
    width={width}
    height={height}
    fontSize={fontSize}
    margin={margin}
    value={value}
    disabled={disabled}
    color={color}
    background={background}
  />
)

export default TextInput
