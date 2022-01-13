import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  border: 1px solid blue;
  display: ${props => props.open ? "block" : "none"};
`

// Todo
const Modal = ({children, open}) => {
  return (
    <Wrapper open={open}>
      {children}
    </Wrapper>
  )
}

export default Modal
