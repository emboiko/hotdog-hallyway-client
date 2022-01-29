import React from "react"
import { observer } from "mobx-react"
import useInject from "~/hooks/useInject"
import Landing from "~/components/Pages/Landing"
import StandardPage from "~/components/StandardPage"

const mapStore = store => ({
  user: store.auth.user
})

const withRequiredCouncilMember = (Child) => observer((() => {
  const { user } = useInject(mapStore)
  if (!user.isCouncilMember) return (
    <StandardPage>
      <Landing />
    </StandardPage>
  )
  return <Child/>
}))


export default withRequiredCouncilMember
