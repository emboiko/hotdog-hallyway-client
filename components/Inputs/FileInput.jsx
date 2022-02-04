import React from "react"
import styled from "styled-components"

const Input = styled.input`
  width: ${props => props.width || "90%"};
  height: ${props => props.height || "initial"};
  font-size: ${props => props.fontSize || "16px"};
  margin: ${props => props.margin || "none"};
  background-image: none !important;
  background: transparent;
  user-select: none;
  font-size: 0px;
  cursor: pointer;
  &::file-selector-button {
    display: none;
  }
`

const FileInput = ({width, height, fontSize, margin, accept, name}) => (
  <Input 
    type="file"
    width={width}
    height={height}
    fontSize={fontSize}
    margin={margin}
    accept={accept}
    name={name}
  />
)

export default FileInput
