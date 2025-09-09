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
    <div className="flex flex-col  items-center mt-10 mb-24 min-h-56 border  mx-5 transition-all duration-300 lg:items-start rounded-xl border-gray-700 hover:shadow-md relative hover:shadow-gray-700 lg:px-10">
        <Title className='absolute -top-16 left-4'>My Account</Title>
        <section className='flex mb-6 w-full justify-center lg:text-start mt-4 lg:mt-8 items-center mx-auto'>
        <UserAvatar username={user?.username}/>
          <div className="h-20 p-2 ml-4 text-sm space-y-2 lg:text-base w-max text-gray-800 font-semibold lg:h-full">
            <h1 className='flex items-center gap-2'>Username : {user?.username} <DialogChangeUsername /></h1>
            <h1>Email : {user?.email}</h1>
            <h1>Role : {user?.role}</h1>            
          </div>
        </section>
        <button onClick={() => signOut()} className="right-10 absolute bottom-4 bg-black text-white hover:bg-black/70 active:bg-black/50  px-4 py-1 rounded font-bold ">LOG OUT</button>
    </div>
  )
}

export default ProfileCard