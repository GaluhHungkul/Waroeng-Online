import React, { useEffect, useState } from 'react'
import UserAvatar from '../profile/UserAvatar'
import useUser from '@/zustand/useUser'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, ShoppingBag, ShoppingCart, User2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import WaroengLogo from '../common/WaroengLogo'
import Link from 'next/link'
import AccountAndSearchBar from './AccountAndSearchBar'
import useDialogAuthCard from '@/zustand/useDialogAuthCard'



const UserNavigationCard = () => {

    const pathname = usePathname()
    const router = useRouter()
    
    const [showCard, setShowCard] = useState(false)
    const { user } = useUser()
    const { setShowAuthCard } = useDialogAuthCard()

    const navigations = [
        {
            id : 1, 
            title : "Cart",
            onClick : () => handleToProfilePage("/cart"),
            icon : ShoppingCart
        },
        {
            id : 2, 
            title : "My Orders",
            onClick : () => handleToProfilePage("/profile/historyshopping"),
            icon : ShoppingBag
        },
        {
            id : 3, 
            title : "Sign Out",
            onClick : () => signOut(),
            icon : LogOut
        },
    ]
    
    const handleToProfilePage = (path:string) => {
        if(!user) return setShowAuthCard("signIn")
        router.push(path)
    }

    useEffect(() => {
        setShowCard(false)
    }, [pathname])


  return (
    <div className='relative flex gap-4 items-center'>
        <AccountAndSearchBar />
        {user 
        ? <button onClick={() => setShowCard(p => !p)}><UserAvatar navbar username={user?.username} showCard={showCard}/></button>
        : <User2 onClick={() => setShowAuthCard("signIn")} className='cursor-pointer text-gray-500 hover:text-gray-700'/>
        }
        <AnimatePresence>
            {showCard && <motion.div 
            initial={{
                y: -20,
                opacity: 0
            }}
            animate={{
                y: 0, 
                opacity: 1
            }}
            exit={{
                y: -20,
                opacity: 0
            }}
            className="absolute w-72 h-max pb- pt-2 right-0 top-[76px] rounded bg-white border border-gray-300 md:top-[92px] md:w-80 lg:w-96">
                <p className='text-center py-1 md:mb-4'>
                    <WaroengLogo userCard/>
                </p>
                <Link href={"/profile/account"} className='flex items-center gap-6 py-4 px-3 hover:bg-gray-200'>
                    <User2 className='text-gray-800'/>
                    <section className='text-sm md:text-base'>
                        <p className='font-bold'>{user?.username}</p>
                        <p className='font-medium text-xs text-gray-500 md:text-sm'>{user?.email}</p>
                    </section>
                </Link>
                <div className='text-sm space-y-2'>
                    {navigations.map((item, index) => (
                        <button onClick={item.onClick} key={item.id} className={`flex gap-6 w-full items-center pb-2 hover:bg-gray-100 px-3 pt-3 font-medium ${index === navigations.length - 1 ? "pb-4 lg:pb-[22px]" : ""} lg:pb-3 lg:pt-4`}>
                            <item.icon className='text-gray-600'/>
                            <p>{item.title}</p>
                        </button>
                    ))}
                </div>
            </motion.div>}
        </AnimatePresence>
    </div>
  )
}

export default UserNavigationCard