"use client";

import AccountSetting from "@/components/profile/AccountSetting";
import ProfileCard from "@/components/profile/ProfileCard";

const AccountPage = () => {    

  return (
    <div className="min-h-screen backdrop-blur-md w-screen pb-10">
      <ProfileCard />
      <AccountSetting />  
    </div>
  );
};

export default AccountPage;
