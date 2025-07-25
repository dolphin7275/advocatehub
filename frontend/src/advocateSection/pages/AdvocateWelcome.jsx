import React from 'react'
import { Outlet } from 'react-router'
import AdvocateSidebar from '../components/AdvocateSidebar'

const AdvocateWelcome = () => {
  return (
    <div>
      <AdvocateSidebar />
      <Outlet />
    </div>
  )
}

export default AdvocateWelcome
