"use client"

import Link from "next/link"
import { User, Menu, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import {  motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "react-responsive"


const ProfileSideBar = () => {

  const [showSideBar, setShowSideBar] = useState<boolean>(false)

  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  },[])

  const pathname = usePathname()

  const isLargeScreen = useMediaQuery({ minWidth : 1024 })

  const sideBarNavigation = [
    { name : 'My Account',  href : `/profile/account`, icon : User, },
    { name : 'History Shopping',  href : `/profile/historyshopping`, icon : ShoppingBag, }
  ]

  if(!isClient) return null

  return (
    <motion.nav 
    initial={{ width : isLargeScreen ? 80 : "100vw" }}
    animate={{ width : isLargeScreen ?  (  showSideBar ? 256 : 80) : "100vw"  }}
    className={`fixed bottom-0 z-[99] w-screen lg:sticky lg:top-24 border-r duration-75 overflow-hidden transition-all ease-linear border-gray-400 backdrop-blur-sm  lg:py-5 flex lg:flex-col lg:min-h-screen lg:flex-shrink-0 lg:h-full`}>
      <button onClick={() => setShowSideBar(p => !p)}  className="hidden lg:block size-max lg:p-2 rounded-full p-1 ml-5 bg-primary-orange hover:scale-110 active:scale-125 duration-200">
        <Menu size={24} strokeWidth={3} color="white" />
      </button>
      <div className="lg:my-5 items-center flex-row-reverse justify-end flex lg:flex-col w-full">
        {sideBarNavigation.map((item) => (
          <Link href={item.href} key={item.name} className={`flex-1 duration-300 relative ${pathname == item.href ? "bg-black lg:bg-primary-orange text-white " : "bg-gray-200 text-primary-orange hover:bg-primary-orange/70 hover:text-white"} font-semibold w-full`}>
            <div className={`my-2 flex items-center justify-center lg:justify-start`}>
            <item.icon size={24} strokeWidth={3} className="ml-7 w-max mr-5 text-blue-500" /> 
            {showSideBar && 
              <motion.span
              initial={{ opacity : 0, width : 0 }}
              animate={{ opacity : 1, width : 'auto' }}
              exit={{ opacity : 0, width : 0 }}
              transition={{ duration : .2, delay : .5 }}
              className="whitespace-nowrap">
                {item.name}
              </motion.span>}
            </div>
          </Link>
        ))}            
      </div>
    </motion.nav>
  )
}

export default ProfileSideBar