import React, {useState} from "react"
import styled, { keyframes } from "styled-components"
import Image from "next/image"
import CloseButtonImage from "~/public/static/img/png/close.png"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"

const fadeIn = keyframes`
  from {
      opacity: 0;
  }

  to {
      opacity: 1;
  }
`

const ModalWrapper = styled.div`
  display: ${props => props.open ? "block" : "none"};
  border-radius: 5px;
  box-shadow: 5px 5px 10px 2px #000000;
  background: ${COLORS.darkGrey};
  position: absolute;
  right: calc(50% - ${props => props.width/2 || 200}px);
  top: calc(50% - ${props => props.height/2 || 100}px);
  z-index: 2;
  width: ${props => props.width || 400}px;
  height: ${props => props.height || 200}px;
  animation: ${fadeIn} 0.25s;
  @media (max-width: ${UI_SIZES.small}px) {
    width: 90%;
    right: 5%;
  }
`

const BackgroundLayer = styled.div`
  opacity: 0.5;
  background: ${COLORS.darkGrey};
  display: ${props => props.open ? "block" : "none"};
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
  top: 0px;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 15px;
  padding: 2px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${rotate} 2s infinite linear;
  animation-play-state: ${props => props.isAnimating ? "running" : "paused"};
`

const Modal = ({children, open, closer, width, height}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  return (
    <div className="font-oswald">
      <BackgroundLayer open={open} onClick={() => {closer()}}/>
      <ModalWrapper open={open} width={width} height={height}>
        <CloseButton onClick={() => {closer()}} onMouseEnter={() => {setIsAnimating(true)}} onMouseLeave={() => {setIsAnimating(false)}} isAnimating={isAnimating}>
          <Image src={CloseButtonImage} width={18} height={18} />
        </CloseButton>
        {children}
      </ModalWrapper>
    </div>
  )
}

export default Modal
