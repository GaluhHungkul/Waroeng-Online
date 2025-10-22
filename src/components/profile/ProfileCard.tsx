"use client"

import useUser from '@/zustand/useUser'
import React from 'react'
import Title from '../common/Title'
import { signOut } from 'next-auth/react'
import UserAvatar from './UserAvatar'
import DialogChangeUsername from './DialogChangeUsername'

const ProfileCard = () => {

  const { user } = useUser()

  return (
    <div className="mt-10 mb-24 min-h-56 border mx-5 transition-all duration-300 lg:items-start md:mt-16 rounded-xl border-gray-700 hover:shadow-md relative hover:shadow-gray-700 lg:px-10 lg:mx-0">
        <Title className='absolute -top-16 left-0 md:-top-20'>My Account</Title>
        <section className='flex h-64 mb-6 flex-col md:flex-row pt-4 lg:text-start mt-4 lg:mt-8 items-center md:items-start md:pt-8 md:justify-evenly lg:justify-between lg:px-10'>
          <UserAvatar username={user?.username}/>
          <div className="mt-8 ml-4 text-sm space-y-2 lg:text-base w-max text-gray-800 font-semibold lg:h-full md:mt-0 md:p-0 md:text-lg">
            <h1 className='flex items-center gap-2'>Username : {user?.username} <DialogChangeUsername /></h1>
            <h1>Email : {user?.email}</h1>
            <h1>Role : {user?.role}</h1>            
          </div>
        </section>
        <button onClick={() => signOut()} className="right-10 absolute bottom-4 h-10 bg-black text-white hover:bg-black/70 md:bottom-12 active:bg-black/50  px-4 py-1 rounded font-bold ">SIGN OUT</button>
    </div>
  )
}

export default ProfileCard