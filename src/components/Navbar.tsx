"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Menu, ShoppingCart } from "lucide-react";

import useCart from "@/zustand/useCart";
import useUser from "@/zustand/useUser";
import SearchProducts from "./SearchProducts";

const Navbar = () => {

  const { setUser, user } = useUser()
  const { cart } = useCart();

  const disableNavbar = ["/login","/register"]
  
  const router = useRouter()
  
  const pathname = usePathname();

  const [showNavScroll, setShowNavScroll] = useState<boolean>(false)
  
  const qtyEachProduct = cart.length ?  cart.map((product) => product.qty) : []
  const totalQtyCart = qtyEachProduct.length
    ? qtyEachProduct.reduce((a, b) => a + b)
    : 0;

  const [loadingGetUser, setLoadingGetUser] = useState<boolean>(true)
  
  useEffect(() => {
    setShowNavScroll(false)
  },[pathname])

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingGetUser(true)
      const res = await fetch("/api/user");
      if(res.status == 404) return router.push("/login")
      const { currUser } = await res.json();
      console.log(currUser)
      setUser(currUser)
      setLoadingGetUser(false)
    };
    fetchUser();
  }, [router, setUser]);
  
  if(disableNavbar.includes(pathname)) return null

  return (
    <nav className="flex h-16 py-2 justify-between bg-black/80 sticky backdrop-blur-md top-0 z-[999] items-center lg:h-20 px-5 lg:px-10  mx-auto">
      <Link href="/" className="hidden lg:block text-white font-bold lg:text-2xl">
        Waroeng
      </Link>
      <SearchProducts />
      <div className="relative">
        {!!totalQtyCart && (
          <span className="absolute bg-green-500 py-[2px] px-2 text-sm -top-4 -right-4 text-white rounded-full">
            {totalQtyCart}
          </span>
        )}
        <Link href="/cart">
          <ShoppingCart size={24} className="text-white hover:text-gray-400" />
        </Link>
      </div>
      <ul className={`z-[99] ${showNavScroll ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 fixed right-0 bg-black/80 backdrop-blur-md lg:backdrop-blur-none  pt-3 h-screen top-0 gap-4 flex-col flex lg:flex-row lg:pr-0  lg:w-max duration-300  py-2  items-end pr-16 lg:text-lg lg:gap-10 lg:static w-1/2 lg:bg-transparent lg:h-max lg:items-center`}>
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
        <li className="order-1 lg:order-3"> {user?.username 
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
      <button onClick={() => setShowNavScroll(!showNavScroll)} className="text-white relative lg:hidden z-[999] ">
        <Menu size={25}/>
      </button>
    </nav>
  );
};

export default Navbar;
 