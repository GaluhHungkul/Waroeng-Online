import { TypeUser } from "@/types/user"
import Link from "next/link"
import { FC } from "react"

type Props = {
    loadingGetUser : boolean
    user : TypeUser | null
}

const Navigation : FC<Props> = ({ loadingGetUser, user }) => {
  return (
    <div className="hidden lg:flex items-center gap-10">
        <Link className="hover:text-gray-300 lg:text-lg font-bold text-white " href="/products" >
          Products
        </Link>
        {loadingGetUser 
        ? <div className="size-10 order-1 lg:order-3 border-r-2 border-l-2 animate-spin rounded-full"></div> 
        :
        <div className="order-1 lg:order-3"> {user 
          ? 
            <Link href={`/profile/account`}  >
              <div className="size-10 cursor-pointer bg-white rounded-full"></div> 
            </Link>
          : 
          <Link className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1" href="/login" >
            Login
          </Link>
        }
        </div>}
    </div>
  )
}

export default Navigation