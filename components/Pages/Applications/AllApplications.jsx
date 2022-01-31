import React, {useEffect, useState} from "react"
import Image from "next/image"
import styled from "styled-components"
import useInject from "~/hooks/useInject"
import HotDogStand from "/public/static/img/jpg/hotdogstand6.jpg"
import { COLORS, UI_SIZES, APPLICATION_STATUSES } from "~/utilities/constants.js"
import Link from "next/link"

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
`

const ApplicationsWrapper = styled.div`
  position: relative;
  margin-top: 75px;
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
  width: 400px;
  margin-bottom: 25px;
  position: relative;
  background: rgba(0,0,0,0.8);
  @media (max-width: ${UI_SIZES.medium}px) {
    font-size: 48px;
    width: 300px;
  }
  @media (max-width: ${UI_SIZES.small}px) {
    width: 100%;
  }
`

const ApplicationsBox = styled.div`
  border-radius: 5px;
  border: 2px solid ${COLORS.accentBlue};
  box-shadow: 3px 2px 10px 0px ${COLORS.accentBlue};
  background: ${COLORS.darkGrey};
  width: 70%;
  min-width: 500px;
  max-width: 1000px;
  overflow: auto;
  padding-bottom: 10px;
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

const SectionHeader = styled.div`
  margin: 10px 0px;
  cursor: pointer;
  user-select: none;
  font-size: 28px;
  color: ${props => props.color};
  text-decoration: ${props => props.showing? "none" : "underline"};
`

const ApplicationCard = styled.div`
  font-size: 20px;
  cursor: pointer;
  transition: color 0.25s linear;
  &:hover {
    color: ${COLORS.accentBlue}
  }
`

const ApplicationSection = styled.div`
  display: ${props => props.showing ? "block" : "none"};
`

const mapStore = store => ({
  getAllApplications: store.applications.getAllApplications
})

const AllApplications = () => {
  const { getAllApplications } = useInject(mapStore)

  const [allApplications, setAllApplications] = useState([])

  useEffect(async () => {
    const applications = await getAllApplications()
    setAllApplications(applications)
  }, [])

  let pendingApplications = []
  let acceptedApplications = []
  let declinedApplications = []

  allApplications.forEach((application) => {
    if (application.status === APPLICATION_STATUSES.pending) pendingApplications.push(application)
    if (application.status === APPLICATION_STATUSES.accepted) acceptedApplications.push(application)
    if (application.status === APPLICATION_STATUSES.declined) declinedApplications.push(application)
  })

  const PendingApplications = pendingApplications.map((application) => {
    return (
      <Link href={`/applications/${application._id}`}>
        <ApplicationCard key={application.playerCharacterName}>
          {application.playerCharacterName} - {application.playerRace} {application.playerClass} - {application.playerSpecialization}
        </ApplicationCard>
      </Link>
    )
  })

  const AcceptedApplications = acceptedApplications.map((application) => {
    return (
      <Link href={`/applications/${application._id}`}>
        <ApplicationCard key={application.playerCharacterName}>
          {application.playerCharacterName} - {application.playerRace} {application.playerClass}
        </ApplicationCard>
      </Link>
    )
  })

  const DeclinedApplications = declinedApplications.map((application) => {
    return (
      <Link href={`/applications/${application._id}`}>
        <ApplicationCard key={application.playerCharacterName}>
          {application.playerCharacterName} - {application.playerRace} {application.playerClass}
        </ApplicationCard>
      </Link>
    )
  })

  const [pendingShowing, setPendingShowing] = useState(true)
  const [acceptedShowing, setAcceptedShowing] = useState(false)
  const [declinedShowing, setDeclinedShowing] = useState(false)

  return (
    <SectionWrapper className="font-squadaone">
      <Image src={HotDogStand} alt="Hotdog Stand" layout="fill" objectFit="cover" objectPosition="top right" quality={90} priority/>
      <ApplicationsWrapper>
        <MainHeader>
          Applications
        </MainHeader>
        <ApplicationsBox>
          <SectionHeader onClick={() => {setPendingShowing(!pendingShowing)}} showing={pendingShowing} color="yellow">Pending</SectionHeader>
          <ApplicationSection showing={pendingShowing}>
            {PendingApplications}
          </ApplicationSection>
          <SectionHeader onClick={() => {setAcceptedShowing(!acceptedShowing)}} showing={acceptedShowing} color={COLORS.lightGreen}>Accepted</SectionHeader>
          <ApplicationSection showing={acceptedShowing}>
            {AcceptedApplications}
          </ApplicationSection>
          <SectionHeader onClick={() => {setDeclinedShowing(!declinedShowing)}} showing={declinedShowing} color="red">Declined</SectionHeader>
          <ApplicationSection showing={declinedShowing}>
            {DeclinedApplications}
          </ApplicationSection>
        </ApplicationsBox>
      </ApplicationsWrapper>
    </SectionWrapper>
  )
}

export default AllApplications
