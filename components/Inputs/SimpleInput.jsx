import React from "react"
import styled from "styled-components"

const Input = styled.input`
  width: ${props => props.width || "90%"};
  font-size: ${props => props.fontSize || "16px"};
`

const SimpleInput = ({type, placeHolder, onChange, width, fontSize}) => (
  <Input 
    type={type} 
    placeholder={placeHolder} 
    onChange={onChange}
    width={width}
    fontSize={fontSize}
  />
)

export default SimpleInput
