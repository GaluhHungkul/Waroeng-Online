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
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
// import Navigation from "./Navigation"
// import ListFilterMoviesBy from "./ListFilterMoviesBy"

const MobileSheet = () => {

  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  },[pathname])

  return (
    <Sheet open={open}  onOpenChange={setOpen}>
      <SheetTrigger asChild className="cursor-pointer lg:hidden">
        <Menu size={32} color="black" strokeWidth={3}/>
      </SheetTrigger>
      <SheetContent  className="z-[999] flex flex-col items-end" >
        <SheetClose/>
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"} className="font-bold text-2xl text-primary">Waroeng Online</Link>
          </SheetTitle>
        </SheetHeader>
        <div className=" space-y-2 text-primary flex flex-col items-end">
          <Link className="hover:underline font-medium text-xl" href={"/profile/account"}>My Profile</Link>
          <Link className="hover:underline font-medium text-xl" href={"/products"}>See All Products</Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet