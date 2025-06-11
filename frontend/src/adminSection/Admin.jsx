import React from 'react'
import { Outlet } from 'react-router'
// import AdminLogin from './AdminLogin.jsx';
// import AdminDashboard from './AdminDashboard.jsx';

const Admin = () => {
  return (
    <div>
        Admin Page

        <Outlet />
    </div>
  )
}

export default Admin
