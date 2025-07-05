import React from 'react'
import { Outlet } from 'react-router'

const ClientWelcome = () => {
  return (
    <div>
      Client Welcome

      <Outlet />
    </div>
  )
}

export default ClientWelcome
