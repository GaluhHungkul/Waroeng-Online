
import { TypeUser } from '@/types/user'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const ProfileCard = ({user} : { user : TypeUser | null }) => {

  const router = useRouter()

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
    <div className="flex flex-col  items-center my-10 min-h-40 border mx-5 transition-all duration-300 lg:items-start rounded-xl border-gray-700 hover:shadow-md relative hover:shadow-gray-700 lg:px-10">
        <h1 className="font-bold mt-4 ml-4 text-xl text-black lg:ml-10 lg:text-2xl">My Account</h1>
        <div className="flex mb-5 mt-2 items-start justify-between  lg:px-6 lg:text-xl lg:mb-8 lg:mt-8 lg:w-full">
          <section className='flex flex-col mb-6 text-center lg:text-start items-center lg:gap-10 lg:flex-row'>
            <div className="size-14 rounded-full bg-black lg:ml-4"></div>
            <div className=" h-20 p-2 pt-3 text-[12px] lg:text-base w-max text-gray-800">
              <h1 className='font-bold'>Username : {user?.username}</h1>
              <h1 className='font-bold'>Role : {user?.role}</h1>
              <h2 className='font-semibold'>User id : {user?._id}</h2>
            </div>
          </section>
          <button onClick={handleLogOut} className="right-10 absolute bottom-4 bg-black text-white lg:static hover:bg-black/70 active:bg-black/50  px-4 py-1 rounded font-bold ">
              LOG OUT
          </button>
        </div>
    </div>
  )
}

export default ProfileCard