import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className='bg-gray-300 '>
      <div className=' h-[50px] flex justify-between items-center
      max-w-6xl mx-auto'>
        <Link to='/'>
        <h1 className='font-semibold text-xl'>User Managment</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li>Home</li>
          </Link>
          <Link to='/about'>
          <li>About</li>
          </Link>
          <Link to='/sign-in'>
          <li>Sign in</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
