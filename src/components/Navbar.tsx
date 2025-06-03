"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ShoppingCart, Menu } from "lucide-react";

import useCart from "@/zustand/useCart";
import useUser from "@/zustand/useUser";
import SearchProducts from "./SearchProducts";

const Navbar = () => {

  const { setUser, user } = useUser()
  const { cart } = useCart();

  const disableNavbar = ["/login","/register"]
  
  const router = useRouter()
  
  const pathname = usePathname();
  
  const qtyEachProduct = cart.length ?  cart.map((product) => product.qty) : []
  const totalQtyCart = qtyEachProduct.length
    ? qtyEachProduct.reduce((a, b) => a + b)
    : 0;

  const [showNavScroll, setShowNavScroll] = useState(true);
  const [loadingGetUser, setLoadingGetUser] = useState<boolean>(true)
  
  useEffect(() => {
    setShowNavScroll(false);
  }, [pathname]);
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoadingGetUser(true)
      const res = await fetch("/api/user");
      if(res.status == 404) return router.push("/login")
      const { currUser } = await res.json();
      setUser(currUser)
      setLoadingGetUser(false)
    };
    fetchUser();
  }, [router, setUser]);
  
  if(disableNavbar.includes(pathname)) return null

  return (
    <nav className="flex py-2  justify-between bg-black/80 sticky top-2 z-[999] lg:w-[90vw] items-center px-5 lg:h-20 lg:px-10 backdrop-blur-md rounded-full mx-auto ">
      <Link href="/" className="text-white font-bold lg:text-2xl">
        Waroeng
      </Link>
      <SearchProducts />
      <div className="relative">
        {!!totalQtyCart && (
          <span className="absolute bg-green-500 py-[2px] px-2 text-sm -top-4 -right-4 rounded-full">
            {totalQtyCart}
          </span>
        )}
        <Link href="/cart">
          <ShoppingCart size={24} className="text-white hover:text-gray-400" />
        </Link>
      </div>
      <ul className={`right-0 h-screen fixed z-[9] top-0  bg-black w-1/2 gap-4 flex flex-col  duration-300 ${showNavScroll ? "translate-x-0" : "translate-x-full" } px-10 py-2 gap-2  lg:flex lg:items-center lg:text-lg lg:gap-10 lg:translate-y-1 lg:static lg:flex-row lg:w-max lg:bg-transparent`}>
        {loadingGetUser 
        ? <div className="size-10 border-r-2 border-l-2 animate-spin rounded-full"></div> 
        :
        <> {user?.username? <Link href={`/profile/account`}  className="size-10 cursor-pointer bg-white rounded-full lg:static" ></Link> : (
          <li>
            <Link className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1 absolute right-20 top-5 lg:static" href="/login" >
              Login
            </Link>
          </li>
        )}
        </>}
        <li>
          <Link className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1" href="/products" >
            Products
          </Link>
        </li>
      </ul>      
      <div className="relative z-10 lg:hidden flex items-center justify-center cursor-pointer flex-col size-max gap-1" onClick={() => setShowNavScroll((prev) => !prev)} >
        <Menu size={24} color="white" />
      </div>
    </nav>
  );
};

export default Navbar;
 