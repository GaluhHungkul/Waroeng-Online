"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import useUser from "@/zustand/useUser";
import SearchProducts from "../SearchProducts";
import { useSession } from "next-auth/react";
import Cart from "./Cart";
import Navigation from "./Navigation";

const Navbar = () => {
  const pathname = usePathname();

  const disableNavbar = ["/login", "/register"];

  const [showNavScroll, setShowNavScroll] = useState<boolean>(false);
  const [loadingGetUser, setLoadingGetUser] = useState<boolean>(false);

  const { data: session, status } = useSession();

  const { setUser, user } = useUser();

  useEffect(() => {
    if (status === "loading") {
      setLoadingGetUser(true);
    } else {
      setLoadingGetUser(false);
      if (session?.user) setUser(session.user);
    }
  }, [status, session, setUser, pathname]);

  useEffect(() => {
    setShowNavScroll(false);
  }, [pathname]);

  if (disableNavbar.includes(pathname)) return null;

  return (
    <nav className="flex h-16 py-2 justify-between bg-black/80 sticky backdrop-blur-md top-0 z-[999] items-center lg:h-20 px-5 lg:px-10  mx-auto">
      <Link href="/" className="hidden lg:block text-white font-bold lg:text-2xl" >
        Waroeng
      </Link>
      <SearchProducts />
      <Cart />
      <Navigation
        showNavScroll={showNavScroll}
        loadingGetUser={loadingGetUser}
        user={user}
      />
      <button
        onClick={() => setShowNavScroll(!showNavScroll)}
        className="text-white relative lg:hidden z-[999] ">
        <Menu size={25} />
      </button>
    </nav>
  );
};

export default Navbar;
