import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
function AdminHeader() {
  return (
    <>
    <Header usertype='admin'/>
    <Outlet/>
    </>
  )
}

export default AdminHeader
