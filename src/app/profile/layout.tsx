import React from 'react'
import ProfileNavbar from '@/components/profile/ProfileNavbar'

const ProfileLlayout = ({ children } : { children : React.ReactNode} ) => {
  return (
    <div className='flex'>
      <ProfileNavbar />
      {children}
    </div>
  )
}

export default ProfileLlayout