"use client";

import AccountSetting from "@/components/profile/AccountControl";
import ProfileCard from "@/components/profile/ProfileCard";

const AccountPage = () => {    

    

  return (
    <div className="min-h-screen backdrop-blur-md w-screen py-10 lg:w-1/2 lg:mx-auto">
      <ProfileCard />
      <AccountSetting />  
    </div>
  );
};

export default AccountPage;
