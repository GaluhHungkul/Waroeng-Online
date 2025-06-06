"use client";

import AccountSetting from "@/components/profile/AccountControl";
import ProfileCard from "@/components/profile/ProfileCard";
import { getUser } from "@/lib/getUser";
import useUser from "@/zustand/useUser";
import { useEffect } from "react";

const AccountPage = () => {    

    const { setUser, user }  = useUser()

   useEffect(() => {
      const fetchUser = async () => {
        const data = await getUser()
        setUser(data)
      }
      fetchUser()
    },[setUser])

  return (
    <div className="min-h-screen backdrop-blur-md w-screen pb-10">
      <ProfileCard user={user}/>
      <AccountSetting />  
    </div>
  );
};

export default AccountPage;
