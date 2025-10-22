import React from 'react'
import ProfileNavbar from '@/components/profile/ProfileSidebar'

const ProfileLayout = ({ children } : { children : React.ReactNode} ) => {
  return (
    <div className='flex'>
      <ProfileNavbar />
      {children}
    </div>
  )
}

export default ProfileLayout