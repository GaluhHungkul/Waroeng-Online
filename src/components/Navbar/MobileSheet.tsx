"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import WaroengLogo from "../common/WaroengLogo"
import useUser from "@/zustand/useUser"
import useDialogLoginCard from "@/zustand/useDialogAuthCard"
import AccountAndSearchBar from "./AccountAndSearchBar"
const MobileSheet = () => {

  const pathname = usePathname()

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { user } = useUser()
  const { setShowAuthCard } = useDialogLoginCard()

  useEffect(() => {
    setOpen(false)
  },[pathname])


  const handleToProfilePage = (path:string) => {
    setOpen(false)
    if(!user) return setShowAuthCard("signIn")
    router.push(path)
  }

  return (
    <Sheet open={open}  onOpenChange={setOpen}>
      <SheetTrigger asChild className="cursor-pointer lg:hidden">
        <Menu size={32} color="black" strokeWidth={3}/>
      </SheetTrigger>
      <SheetContent  className="z-[999] flex flex-col items-end" >
        <SheetClose/>
        <SheetHeader>
          <SheetTitle>
            <WaroengLogo />
          </SheetTitle>
        </SheetHeader>
        <div className="gap-2 mt-2 text-gray-700 flex flex-col items-end">
          <AccountAndSearchBar />
          <p onClick={() => handleToProfilePage("/profile/account")} className="hover:underline  font-medium text-xl mt-6" >My Profile</p>
          <p onClick={() => handleToProfilePage("/cart")} className="hover:underline  font-medium text-xl" >My Cart</p>
          <p onClick={() => handleToProfilePage("/profile/historyshopping")} className="hover:underline  font-medium text-xl" >My Orders</p>
          <Link className="hover:underline  font-medium text-xl" href={"/products"}>See All Products</Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet