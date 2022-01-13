import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: ${props => props.open ? "block" : "none"};
  border-radius: 5px;
  box-shadow: 5px 5px 5px 1px #000000;
  background: #181A1B;
  position: absolute;
  right: calc(50% - 200px);
  top: 50%;
  z-index: 10;
  width: 400px;
`

const Modal = ({children, open}) => {
  return (
    <Wrapper open={open}>
      {children}
    </Wrapper>
  )
}

export default Modal
