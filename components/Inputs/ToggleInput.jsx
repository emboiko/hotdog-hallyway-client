import React from "react"
import styled from "styled-components"
import { COLORS } from "~/utilities/constants.js"

const Input = styled.input`
  margin: ${props => props.margin || "none"};
  appearance: none;
  padding: 10px 25px;
  border-radius: 10px;
  background: radial-gradient(circle ${props => props.size || "8px"}, ${props => props.sliderColor || "#FFFFFF"} 100%, transparent calc(100% + 1px)) #ccc -14px;
  transition: 0.3s ease-in-out;
  &:checked {
    background-color: ${COLORS.accentBlue};
    background-position: 14px;
  }
`

const CheckboxInput = ({value, checked, disabled, onChange, width, height, fontSize, margin, color, background}) => {
  return (
    <Input 
      type="checkbox"
      onChange={onChange}
      width={width}
      height={height}
      fontSize={fontSize}
      margin={margin}
      disabled={disabled}
      color={color}
      background={background}
      value={value}
      checked={checked}
    />
  )
}

export default CheckboxInput
