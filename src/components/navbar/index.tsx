"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";


import useUser from "@/zustand/useUser";
import { useSession } from "next-auth/react";
import CartSheet from "./CartSheet";
import TitleAndSearch from "./TitleAndSearch";
import Navigation from "./Navigation";

const Navbar = () => {
  const pathname = usePathname();

  const disableNavbar = ["/login", "/register"];

  const { data: session, status } = useSession();

  const { setUser, user } = useUser();


  useEffect(() => {
    if (status !== "loading") if (session?.user) setUser(session.user)
  }, [status, session, setUser, pathname]);


  if (disableNavbar.includes(pathname)) return null;

  return (
    <nav className="flex h-16 py-2 justify-between bg-primary sticky backdrop-blur-md top-0 z-[999] items-center lg:h-20 px-5 lg:px-10  mx-auto">
      <TitleAndSearch />
      <Navigation user={user} loadingGetUser={status === "loading"} />
      <CartSheet />
    </nav>
  );
};

export default Navbar;
