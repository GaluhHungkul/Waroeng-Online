import useUser from '@/zustand/useUser'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfileCard = () => {

  const { user } = useUser()

  const router = useRouter()

  const handleLogOut = async () => {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) router.push("/login");
  }

  return (
    <div className="flex flex-col items-center my-10 min-h-40 border mx-5 transition-all duration-300 rounded-xl border-gray-700 hover:shadow-md relative hover:shadow-gray-700 lg:px-10">
        <h1 className="font-bold mt-4 ml-4 text-xl text-black lg:ml-10 lg:text-2xl">My Account</h1>
        <div className="flex mb-5 mt-2 items-start justify-between  lg:px-6 lg:text-xl lg:mb-8 lg:mt-8">
          <section className='flex flex-col mb-6 text-center items-center lg:gap-10'>
            <div className="size-14 rounded-full bg-black lg:ml-4"></div>
            <div className=" h-20 p-2 pt-3  w-max text-gray-800">
              <h1 className='font-bold'>Username : {user?.username}</h1>
              <h2 className='font-semibold'>Id : {user?._id}</h2>
            </div>
          </section>
        <button onClick={handleLogOut} className="right-10 absolute bottom-4 bg-black text-white hover:bg-black/70 active:bg-black/50  px-4 py-1 rounded font-bold ">
            LOG OUT
        </button>
        </div>
    </div>
  )
}

export default ProfileCard