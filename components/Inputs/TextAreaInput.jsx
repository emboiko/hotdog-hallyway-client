import React from "react"
import styled from "styled-components"

const Input = styled.textarea`
  width: ${props => props.width || "initial"};
  height: ${props => props.height || "initial"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  color: ${props => props.color || "initial"};
  background: ${props => props.background || "#FFFFFF"};
  resize: ${props => props.resize || "initial"};
  outline: none;
`

const TextAreaInput = ({value, disabled, onChange, width, height, fontSize, margin, color, background}) => {
  return (
    <Input 
      resize={"vertical"}
      onChange={onChange}
      width={width}
      height={height}
      fontSize={fontSize}
      margin={margin}
      value={value}
      disabled={disabled}
      color={color}
      background={background}
      rows={3}
    />
  )
}

export default TextAreaInput
