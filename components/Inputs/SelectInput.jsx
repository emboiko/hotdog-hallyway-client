import React from "react"
import styled from "styled-components"

const Input = styled.select`
  width: ${props => props.width || "90%"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  color: ${props => props.color || "initial"};
  background: ${props => props.background || "#FFFFFF"};
`

const SelectInput = ({value, disabled, placeHolder, onChange, width, fontSize, margin, color, background, options}) => {
  const optionsList = options.map((option) => {
    return <option key={option} value={option}>{option}</option>
  })

  return (
    <Input 
      placeholder={placeHolder} 
      onChange={onChange}
      width={width}
      fontSize={fontSize}
      margin={margin}
      value={value}
      disabled={disabled}
      color={color}
      background={background}
    >
      {optionsList}
    </Input>
  )
}

export default SelectInput
