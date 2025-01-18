"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();

  const [verifyPassword, setVerifyPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim() == "" || password.trim() == "") return;

    setLoading(true);

    try {
      const result = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const response = await result.json();
      setLoading(false);
      if (response.ok) return router.push("/login");
      } catch (error) {
        setLoading(false);
        console.log("error : " + error);
      }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 backdrop-blur-sm">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full  w-80 mx-auto sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username address
            </label>
            <div className="mt-2">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                id="username"
                placeholder="Username"
                autoComplete="username"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {!!username.length &&(username.trim().length < 8) && (
              <span className="text-red-500 text-sm text-opacity-80">
                Username must be at least 8 characters
              </span>
            )}
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {!!password.length &&(password.trim().length < 8) && (
                <span className="text-red-500 text-sm text-opacity-80">
                  Password must be at least 8 characters
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                type="password"
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="Verify your password"
                name="vpassword"
                id="vpassword"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {!!verifyPassword.length && password !== verifyPassword && (
                <span className="text-red-500 text-sm text-opacity-80">
                  Password must be the same
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={password !== verifyPassword || loading}
              className="flex h-[37px] relative w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-blue-900 "
            >
              
              {loading ? (
                <div className="size-5   absolute border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?
          <Link href='/login' className="font-semibold text-indigo-600 hover:text-indigo-500"> Click here!</Link>      
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
