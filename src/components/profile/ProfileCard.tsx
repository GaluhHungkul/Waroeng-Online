
import useUser from '@/zustand/useUser'
import React from 'react'
import Title from '../common/Title'
import { signOut } from 'next-auth/react'

const ProfileCard = () => {

  const { user } = useUser()


  return (
    <div className="flex flex-col  items-center mt-10 mb-24 min-h-56 border  mx-5 transition-all duration-300 lg:items-start rounded-xl border-gray-700 hover:shadow-md relative hover:shadow-gray-700 lg:px-10">
        <Title className='absolute -top-16 left-4'>My Account</Title>
        <section className='flex mb-6 w-4/5 lg:text-start mt-4 lg:mt-8 items-center mx-auto lg:justify-between '>
          <div style={{ backgroundImage : `url("https://ui-avatars.com/api/?name=${user?.username}&background=random")` }} className="size-14 rounded-full   lg:ml-4 lg:size-24 bg-cover bg-center" ></div>
          <div className="h-20 p-2 ml-4 text-sm  lg:text-base w-max text-gray-800 font-semibold lg:h-full">
            <h1>Username : {user?.username}</h1>
            <h1>Email : {user?.email}</h1>
            <h1>Role : {user?.role}</h1>            
          </div>
        </section>
        <button onClick={() => signOut()} className="right-10 absolute bottom-4 bg-black text-white hover:bg-black/70 active:bg-black/50  px-4 py-1 rounded font-bold ">
            LOG OUT
        </button>
    </div>
  )
}

export default ProfileCard