import React from 'react'
import ProfileNavbar from '../Components/profile/ProfileNavbar'

const ProfileLlayout = ({ children } : { children : React.ReactNode} ) => {
  return (
    <div className='flex'>
      <ProfileNavbar />
      {children}
    </div>
  )
}

export default ProfileLlayout