"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ShoppingCart, Menu } from "lucide-react";

import { TypeUser } from "@/types/user";
import useCart from "@/zustand/useCart";
import BackgroundAnimation from "./BackgroundAnimation";

const Navbar = () => {

  const { cart } = useCart();

  const disableNavbar = ["/login","/register"]
  
  const router = useRouter()
  
  const pathname = usePathname();
  
  const qtyEachProduct = cart.length ?  cart.map((product) => product.qty) : []
  const totalQtyCart = qtyEachProduct.length
    ? qtyEachProduct.reduce((a, b) => a + b)
    : 0;

  const [showNavScroll, setShowNavScroll] = useState(false);
  const [userProfile, setUserProfile] = useState<TypeUser | null>(null);
  
  useEffect(() => {
    setShowNavScroll(false);
  }, [pathname]);
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      if(res.status == 404) return router.push("/login")
      const result = await res.json();
      setUserProfile(result.currUser);
    };
    fetchUser();
  }, [router]);
  
  if(disableNavbar.includes(pathname)) return null

  return (
    <div className="flex backdrop justify-between sticky lg:mt-5 top-2 z-[999] bg-secondary items-center px-5 h-20 lg:px-10 backdrop-blur-md rounded-full lg:w-[90vw] mx-auto overflow-hidden">
      <BackgroundAnimation />
      <Link href="/" className="text-white font-bold text-xl lg:text-2xl">
        Waroeng
      </Link>
      {/* <SearchProducts /> */}
      <ul
        className={`left-0 fixed z-[9] border-b lg:border-none h-20 bg-gray-700 w-full gap-4 flex flex-col  duration-300 ${
          showNavScroll ? "top-0" : "-translate-y-full"
        } px-10 py-2 gap-2  lg:flex lg:items-center lg:text-lg lg:gap-10 lg:translate-y-1 lg:static lg:flex-row lg:w-max lg:bg-transparent`}
      >
        <li>
          <Link
            className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1"
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1"
            href="/products"
          >
            Products
          </Link>
        </li>
        {userProfile?.username? (
          <Link
            href={`/profile/account`}
            className="size-10 cursor-pointer bg-white rounded-full fixed right-20 top-5 lg:static"
          ></Link>
        ) : (
          <li>
            <Link
              className="hover:text-gray-300 hover:border-b border-white  font-bold text-white active:text-gray-400 py-1 absolute right-20 top-5 lg:static"
              href="/login"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      <div className="absolute  right-20 lg:right-[400px]">
        {!!totalQtyCart && (
          <span className="absolute bg-green-500 py-[2px] px-2 text-sm -top-4 -right-4 rounded-full">
            {totalQtyCart}
          </span>
        )}
        <Link href="/cart">
          <ShoppingCart size={24} className="text-white hover:text-gray-400" />
        </Link>
      </div>
      <div
        className="relative z-10 lg:hidden flex items-center justify-center cursor-pointer flex-col size-max gap-1"
        onClick={() => setShowNavScroll((prev) => !prev)}
      >
        <Menu size={24} color="white" />
      </div>
    </div>
  );
};

export default Navbar;
