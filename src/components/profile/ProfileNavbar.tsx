"use client"

import Link from "next/link"
import { User, Menu, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"



const ProfileNavbar = () => {


  const [showSideBar, setShowSideBar] = useState<boolean>(false)

  const pathname = usePathname()


  const sideBarNavigation = [
    { name : 'My Account', href : `/profile/account`, icon : User, color : '#2366f3' },
    { name : 'History Shopping', href : `/profile/historyshopping`, icon : ShoppingBag, color : '#6366f1' }
  ]

  return (
    <motion.nav
    animate={{ width: showSideBar ? 256 : 80 }}
    className={`relative z-10 border-r duration-75 overflow-hidden  transition-all ease-linear border-gray-400 backdrop-blur-sm  py-5 flex flex-col min-h-screen flex-shrink-0 `}>
      <button onClick={() => setShowSideBar(!showSideBar)} className="hidden lg:block size-max bg-black/70 lg:p-2 hover:bg-black/75 active:bg-black/55 rounded-full p-1 hover:scale-125 ml-5  duration-300">
        <Menu size={24} color="#ffffff"/>
      </button>
      <AnimatePresence>
        <div className="my-5 items-center flex flex-col">
          {sideBarNavigation.map((item) => (
            <div key={item.name} className={`hover:scale-110 duration-300 relative ${pathname == item.href ? "bg-black/70 text-white " : "bg-white  text-gray-500 hover:bg-black/30 hover:text-white"} w-full`}>
              <Link href={item.href} className={`my-2 flex items-center`}>
              <item.icon size={24} className="min-w-20 w-max" style={{ color : item.color }} /> 
              {showSideBar && 
                <motion.span 
                initial={{ opacity : 0, width : 0 }}
                animate={{ opacity : 1, width : 'auto' }}
                exit={{ opacity : 0, width : 0 }}
                transition={{ duration : .2, delay : .5 }}
                className=" whitespace-nowrap mr-4 relative right-4">
                  {item.name}
                </motion.span>}
              </Link>
            </div>
          ))}            
        </div>
      </AnimatePresence>
    </motion.nav>
  )
}

export default ProfileNavbar