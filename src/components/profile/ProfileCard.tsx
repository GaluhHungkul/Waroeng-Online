
import useUser from '@/zustand/useUser'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import Title from '../common/Title'

const ProfileCard = () => {

  const router = useRouter()

  const { user } = useUser()

  const handleLogOut = async () => {
    const loadingToast = toast.loading("Logout...")
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        toast.success("Berhasil logout")
        router.push("/login");
      }
    } catch (error) {
      console.log("Error : " , error)
      toast.error("Gagal logout")
    }
    toast.dismiss(loadingToast)
  }

  return (
    <div className="flex flex-col  items-center mt-10 mb-24 min-h-56 border  mx-5 transition-all duration-300 lg:items-start rounded-xl border-gray-700 hover:shadow-md relative hover:shadow-gray-700 lg:px-10">
        <Title className='absolute -top-16 left-4'>My Account</Title>
        <section className='flex mb-6 w-4/5 lg:text-start mt-4 lg:mt-8 items-center mx-auto lg:justify-between'>
          <div className="size-14 rounded-full bg-black  lg:ml-4 lg:size-20"></div>
          <div className="h-20 p-2 ml-4 text-sm  lg:text-base w-max text-gray-800 font-semibold ">
            <h1>Username : {user?.username}</h1>
            <h1>Email : {user?.email}</h1>
            <h1>Role : {user?.role}</h1>            
          </div>
        </section>
        <button onClick={handleLogOut} className="right-10 absolute bottom-4 bg-black text-white hover:bg-black/70 active:bg-black/50  px-4 py-1 rounded font-bold ">
            LOG OUT
        </button>
    </div>
  )
}

export default ProfileCard