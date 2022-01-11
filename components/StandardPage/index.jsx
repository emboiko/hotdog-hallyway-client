import React from "react"
import styled from "styled-components"
import Header from "~/components/Header"
import Footer from "~/components/Footer"

const PageContent = styled.div`
  min-height: 100vh;
  background: #181A1B;
  color: #FFFFFF;
`

const StandardPage = ({children}) => {
  return (
    <>
      <Header />
      <PageContent>
        {children}
      </PageContent>
      <Footer />
    </>
  )
}

export default StandardPage
