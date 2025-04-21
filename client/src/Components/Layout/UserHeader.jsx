import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
function UserHeader() {
  return (
    <>
      <Header userType='user'/>
      <Outlet/>
    </>
  )
}

export default UserHeader
