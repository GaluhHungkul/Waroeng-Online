"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";


import useUser from "@/zustand/useUser";
import { useSession } from "next-auth/react";
import Navigation from "./Navigation";
import WaroengLogo from "../common/WaroengLogo";
import SearchProducts from "../SearchProducts";
import UserNavigationCard from "./UserNavigationCard";

const Navbar = () => {

  const pathname = usePathname()

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString());

  const disableNavbar = ["/login", "/register"];

  const { data: session, status } = useSession();

  const { setUser } = useUser();


  useEffect(() => {
    if (status !== "loading") if (session?.user) setUser(session.user);
  }, [status, session, setUser, pathname]);


  if (disableNavbar.includes(pathname)) return null;

  return (
    <nav className="border-b border-gray-300 px-4 md:px-0 bg-white sticky top-0 z-10">
      <div className="flex h-16 md:h-24 justify-between  items-center md:w-4/5 md:mx-auto lg:h-16">
        <WaroengLogo />
        <section className="flex justify-between w-full md:w-max md:justify-end md:gap-10 lg:w-3/4 lg:justify-between">
          <div className="lg:hidden">
            <SearchProducts params={params} searchProductsPage/>
          </div>
          <Navigation />
          <UserNavigationCard />
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
