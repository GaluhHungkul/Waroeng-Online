
import { TypeUser } from "@/types/user"
import Link from "next/link"
import { FC } from "react"

type Props = {
    showNavScroll : boolean
    loadingGetUser : boolean
    user : TypeUser | null;
}

const Navigation : FC<Props>= ({ showNavScroll, loadingGetUser, user }) => {

    

  return (
     <ul className={`z-[99]  ${showNavScroll ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 fixed right-0 bg-black/80 backdrop-blur-xl  lg:backdrop-blur-none pt-16 h-screen top-0 gap-4 flex-col flex lg:flex-row lg:pr-0  lg:w-max duration-300  py-2  items-end pr-5 lg:text-lg lg:gap-10 lg:static w-1/2 lg:bg-transparent lg:h-max lg:items-center lg:py-0`}>
        <Link href={"/"} className="lg:hidden absolute right-20 top-4 text-white font-bold ">Waroeng</Link>
        <li className="order-2">
          <Link className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1" href="/" >
            Dashboard
          </Link>
        </li>
        <li className="order-2">
          <Link className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1" href="/products" >
            Products
          </Link>
        </li>
        {loadingGetUser 
        ? <div className="size-10 order-1 lg:order-3 border-r-2 border-l-2 animate-spin rounded-full"></div> 
        :
        <li className="order-1 lg:order-3"> {user 
          ? 
            <Link href={`/profile/account`}  >
              <div className="size-10 cursor-pointer bg-white rounded-full"></div> 
            </Link>
          : 
          <Link className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1" href="/login" >
            Login
          </Link>
        }
        </li>}
      </ul>
  )
}

export default Navigation