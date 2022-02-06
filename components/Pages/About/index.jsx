import React from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import HotDogStand from "/public/static/img/jpg/hotdogstand2.jpg"
import GroupVashj from "/public/static/img/jpg/groupVashj.jpg"
import GroupArchimonde from "/public/static/img/jpg/groupArchimonde.jpg"
import GroupAkama from "/public/static/img/jpg/groupAkama.jpg"
import GroupBlackTemple from "/public/static/img/jpg/groupBlackTemple.jpg"
import HuxAndEd from "/public/static/img/jpg/huxAndEd.jpg"
import Neko from "/public/static/img/png/neko.png"
import Tina from "/public/static/img/png/tina.png"
import { COLORS, UI_SIZES } from "~/utilities/constants.js"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const AboutWrapper = styled.div`
  position: relative;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-bottom: 25px;
`

const MainHeader = styled.div`
  text-align: center;
  font-size: 72px;
  color: pink;
  border-radius: 5px;
  border: 2px solid pink;
  box-shadow: 3px 2px 10px 0px pink;
  width: 300px;
  margin-bottom: 25px;
  position: relative;
  background: rgba(0,0,0,0.8);
  @media (max-width: ${UI_SIZES.medium}px) {
    font-size: 48px;
    width: 200px;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    width: 100%;
  }
`

const AboutBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  width: 75%;
  min-width: 500px;
  max-width: 1800px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
    background: rgba(24, 26, 27, 0.975);
  }
  &::-webkit-scrollbar-thumb {
    background: pink;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${UI_SIZES.medium}px) {
    min-width: initial;
    width: 90%;
  }
`

const AboutTextSection = styled.div`
  margin: 10px 25px;
  font-size: 20px;
`

const LinkText = styled.span`
  cursor: pointer;
  color: ${COLORS.accentBlue};
`

const AboutTextBox = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.975;
  background: ${COLORS.darkGrey};
`

const AboutImageBox = styled.div`
  width: 100%;
`

const About = () => {
  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" quality={90} priority/>
      <AboutWrapper>
        <MainHeader>
          About Us
        </MainHeader>
        <AboutBox>
          <AboutTextBox>
            <AboutTextSection>
              {"We would personally like to thank you for your interest in <Hotdog Hallway>."}
            </AboutTextSection>
            <AboutTextSection>
              {"<Hotdog Hallway> is a progression raiding guild with goals of clearing all content before subsequent phases are released. We raid Saturdays from 8:00 PM - 12:00 AM server time and Sundays from 8:00 PM - 11:00 PM server time. We tend to keep a very light and fun raiding environment. We can guarantee you that there is no raid like a <Hotdog Hallway> raid."}
            </AboutTextSection>
            <AboutTextSection>
              {"We strive to help each of our raiders with anything they need. Core Raiders get all enchants/gems at no cost (while supplies last) whereas raiders and other guild members receive 50% off the AH price. With a collective game knowledge of over 50 years, our five Guild Council members have the experience and knowledge to lead a successful guild."}
            </AboutTextSection>
            <AboutTextSection>
              {"<Hotdog Hallway> Utilizes a rotating loot council that consists of 2 Guild Council members and 3 Core Raiders. The rotation changes weekly. We reference "}
              <a href="https://thatsmybis.com/" target="_blank"><LinkText>ThatsMyBis</LinkText></a>
              {" to always have up-to-date knowledge on our raiders gearing needs. This system ensures fair loot distribution, and allows every single Core Raider to have a voice in loot disbursement."}
            </AboutTextSection>
            <AboutTextSection>
              {"Think you have what it takes to throw your Hotdog down our Hallway? Raiders "}
              <Link href="/apply"><LinkText>Apply Today</LinkText></Link>
              {", Casuals and PvPers are always welcome!"}
            </AboutTextSection>
            <AboutTextSection>
              {"<Hotdog Hallway> What's in your wallet?"}
            </AboutTextSection>
          </AboutTextBox>
          <AboutImageBox>
            <Image src={GroupArchimonde} layout="responsive"/>
          </AboutImageBox>
          <AboutImageBox>
            <Image src={GroupVashj} layout="responsive"/>
          </AboutImageBox>
          <AboutImageBox>
            <Image src={GroupBlackTemple} layout="responsive"/>
          </AboutImageBox>
          <AboutImageBox>
            <Image src={GroupAkama} layout="responsive"/>
          </AboutImageBox>
          <AboutImageBox>
            <Image src={Tina} layout="responsive"/>
          </AboutImageBox>
          <AboutImageBox>
            <Image src={Neko} layout="responsive"/>
          </AboutImageBox>
          <AboutImageBox>
            <Image src={HuxAndEd} layout="responsive"/>
          </AboutImageBox>
        </AboutBox>
      </AboutWrapper>
    </SectionWrapper>
  )
}

export default About
