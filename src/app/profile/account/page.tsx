"use client";

import { TypeUser } from "@/types/user";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  
  const [user, setUser] = useState<TypeUser | null>(null);

  const [newUsername, setNewUsername] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");

  const [passwordLama, setPasswordLama] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newUsername.trim() == "" ||
      newPassword.trim() == "" ||
      passwordLama.trim() == ""
    )
      return;

    setLoading(true);

    try {
      const result = await fetch("/api/user/changedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passwordLama,
          newUsername,
          newPassword,
        }),
      });
      const response = await result.json();
      console.log(response);
      if(result.ok) router.refresh()
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error : " + error);
    }
  };

  const handleLogOut = async () => {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) router.push("/login");
  }

  useEffect(() => {
    const fetchDataUser = async () => {
      const res = await fetch("/api/user");
      const result = await res.json();
      console.log(result);
      setUser(result.currUser);
    };
    fetchDataUser();
  }, []);

  return (
    <div className="min-h-screen backdrop-blur-md w-screen pb-10">
      <div className=" my-10 min-h-40 border mx-5 transition-all duration-300  border-gray-700 hover:shadow-md  hover:shadow-gray-700 lg:px-10">
        <h1 className="font-bold mt-4 ml-4 text-xl text-gray-100 lg:ml-10 lg:text-2xl">Who am i</h1>
        <div className="flex mb-5 mt-2 mx-auto  items-center  justify-between lg:justify-start lg:gap-10 lg:px-6 lg:text-xl lg:mb-8 lg:mt-8">
          <div className="size-14 rounded-full bg-white ml-4"></div>
          <div className=" h-20 p-2 pt-3  w-max">
            <h1 className="text-gray-400  ">Username : {user?.username}</h1>
            <h1 className="text-gray-400  ">Id : {user?._id}</h1>
          </div>
        </div>
      </div>
      <div className=" my-10 min-h-80 border mx-5 transition-all duration-300  border-gray-700 hover:shadow-md hover:shadow-gray-700 ">
        <div className="relative pl-5 pr-8 h-20 flex items-center justify-between lg:px-20">
          <h1 className="font-bold  text-xl text-gray-100 lg:text-2xl">Account</h1>
          <button onClick={handleLogOut} className="right-10 bottom-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 px-4 py-1 rounded font-bold ">
            LOG OUT
          </button>
        </div>
        <form onSubmit={handleSubmit} className="  min-h-64 my-10 relative lg:px-20">
          <div className="flex justify-between items-center mx-2  mt-5 lg:mx-0">
            <label htmlFor="username" className="text-sm text-gray-400 lg:text-xl">
               Username Baru
            </label>
            <input
              required
              onChange={(e) => setNewUsername(e.target.value)}
              type="text"
              placeholder="Username baru"
              value={newUsername}
              className="bg-gray-700 px-2 py-1 rounded"
            />
          </div>
          <div className="flex justify-between items-center mx-2  mt-5 lg:mx-0">
            <label htmlFor="username" className="text-sm text-gray-400 lg:text-xl">
               Password Baru
            </label>
            <input
              required
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Password baru"
              value={newPassword}
              className="bg-gray-700 px-2 py-1 rounded"
            />
          </div>
          <AnimatePresence>
            {!!newPassword.trim().length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.1,
                }}
                className="flex justify-between items-center mx-2  mt-5 lg:mx-0"
              >
                <label htmlFor="username" className="text-sm text-gray-400 lg:text-xl">
                  Verifikasi password sebelumnya
                </label>
                <input
                  required
                  onChange={(e) => setPasswordLama(e.target.value)}
                  type="password"
                  placeholder="Password sebelumnya"
                  value={passwordLama}
                  className="bg-gray-700 px-2 py-1 rounded"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            disabled={loading}
            type="submit"
            className="absolute bottom-16 right-5 bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 active:bg-gray-500 disabled:bg-gray-900 lg:right-20 lg:px-8 lg:py-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
