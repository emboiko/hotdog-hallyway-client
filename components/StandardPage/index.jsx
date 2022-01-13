import React from "react"
import styled from "styled-components"
import Header from "~/components/Header"
import Footer from "~/components/Footer"

const PageContent = styled.div`
  background: #181A1B;
  color: #FFFFFF;
  height: calc(100vh - 30px);
  position: relative;
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
