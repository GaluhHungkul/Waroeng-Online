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
import useDialogLoginCard from "@/zustand/useDialogLoginCard"
const MobileSheet = () => {

  const pathname = usePathname()

  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { user } = useUser()
  const { setShowLoginCard } = useDialogLoginCard()

  useEffect(() => {
    setOpen(false)
  },[pathname])


  const handleToProfilePage = () => {
    setOpen(false)
    if(!user) return setShowLoginCard(true)
    router.push("/profile/account")
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
        <div className=" space-y-2 text-gray-700 flex flex-col items-end">
          <p onClick={handleToProfilePage} className="hover:underline  font-medium text-xl" >My Profile</p>
          <Link className="hover:underline  font-medium text-xl" href={"/products"}>See All Products</Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet