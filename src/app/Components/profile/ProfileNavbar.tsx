"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { User, Menu, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"



const ProfileNavbar = () => {

  const params = useParams()

  const [showSideBar, setShowSideBar] = useState<boolean>(false)

  const { id } = params

  const sideBarNavigation = [
    { name : 'History Shopping', href : `/profile/${id}/historyshopping`, icon : ShoppingBag, color : '#6366f1' },
    { name : 'My Account', href : `/profile/${id}/account`, icon : User, color : '#2366f3' },
  ]

  return (
    <motion.div 
    animate={{
      width: showSideBar ? 256 : 80
    }}
 
    className={`relative z-10 border-r duration-200 overflow-hidden transition-all ease-linear border-gray-400 backdrop-blur-sm inset-y-0  py-5 flex flex-col  `}>
        <button onClick={() => setShowSideBar(!showSideBar)} className="size-max bg-white/10 hover:bg-white/25 active:bg-white/30 rounded-full p-1 hover:scale-125 ml-4  duration-300">
          <Menu size={24} color="#ffffff"/>
        </button>
        <AnimatePresence>
          <div className="my-5 flex flex-col gap-1">
            {sideBarNavigation.map((item) => (
              <div key={item.name} className="hover:bg-white/20 hover:scale-110 duration-300 relative right-2">
                <Link href={item.href} className={`text-gray-400 my-2 flex  items-center`}>
                <item.icon size={24} className="min-w-20  w-max" style={{ color : item.color }} /> 
                {showSideBar && 
                  <motion.span 
                  initial={{
                    opacity : 0,
                    width : 0
                  }}
                  animate={{
                    opacity : 1,
                    width : 'auto'
                  }}
                  exit={{
                    opacity : 0,
                    width : 0
                  }}
                  transition={{
                    duration : .2,
                    delay : .5
                  }}
                  className=" whitespace-nowrap mr-4 relative right-4"
                  >{item.name}</motion.span>
                }
                </Link>
              </div>
            ))}            
          </div>
        </AnimatePresence>
    </motion.div>
  )
}

export default ProfileNavbar