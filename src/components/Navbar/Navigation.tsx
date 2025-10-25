import { TypeUser } from "@/types/user"
import Link from "next/link"
import { FC } from "react"
import AccountAndSearchBar from "./AccountAndSearchBar"

const navigation = [
  {
    id : 1, 
    title : "Home",
    href : "/"
  },
  {
    id : 2, 
    title : "Products",
    href : "/products"
  },
]

type Props = {
    loadingGetUser : boolean
    user : TypeUser | null
}

const Navigation : FC<Props> = ({ loadingGetUser, user }) => {
  return (
    <div className="hidden lg:flex items-center gap-10 justify-between w-1/2">
      <section className="flex gap-8">
        {navigation.map(nav => (
          <Link key={nav.id} className="text-gray-400 hover:text-gray-500 lg:text-lg font-bold" href={nav.href} >
          {nav.title}
        </Link>
        ))}
      </section>
      {loadingGetUser 
      ? <div className="size-10 order-1 lg:order-3 border-r-2 border-l-2 animate-spin rounded-full"></div> 
      :
      <div className="order-1 lg:order-3"> {user 
        ? 
          <AccountAndSearchBar />
        : 
        <Link className="hover:text-gray-300 hover:border-b border-white  font-bold text-black active:text-gray-400 py-1" href="/login" >
          Login
        </Link>
      }
      </div>}
    </div>
  )
}

export default Navigation