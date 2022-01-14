import React from "react"
import styled from "styled-components"

const Input = styled.input`
  width: ${props => props.width || "90%"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
`

const TextInput = ({type, placeHolder, onChange, width, fontSize, margin}) => (
  <Input 
    type={type} 
    placeholder={placeHolder} 
    onChange={onChange}
    width={width}
    fontSize={fontSize}
    margin={margin}
  />
)

export default TextInput
