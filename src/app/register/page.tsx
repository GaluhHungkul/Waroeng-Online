"use client";

import Input from "@/components/tags/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const registerSchema = z
  .object({
  username : z.string().min(8),
  password : z.string().min(8),
  confirmPassword : z.string().min(8)
})
  .refine((data) => data.password === data.confirmPassword, {
    message : "Password tidak cocok",
    path : ["confirmPassword"]
  })

type RegisterSchema = z.infer<typeof registerSchema>

const RegisterPage = () => {

  const router = useRouter();

  const { register, handleSubmit, formState : { errors }, reset } = useForm({
    resolver : zodResolver(registerSchema)
  })

  const [loading, setLoading] = useState<boolean>(false)


  const myHandleSubmit = async ({username, password}:RegisterSchema) => {   
    setLoading(true);
    const loadingToast = toast.loading("Memproses informasi user...")
    try {

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (res.ok) {
        reset()
        toast.dismiss(loadingToast)
        return router.push("/login");
      }
      const { message } = await res.json();
      toast.error(message)
      
    } catch (error) {
      toast.error("Terjadi kesalahan")
      console.log("error : " + error);
    }
    setLoading(false);
    toast.dismiss(loadingToast)
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 backdrop-blur-sm">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full  w-80 mx-auto sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit(myHandleSubmit)}>
          <div className='lg:pb-2'>
            <Input {...register("username")} label='Username' type="text" name="username" id="username" required  />
            <p className='text-red-500 lg:text-sm lg:pt-2 '>{errors.username?.message}</p>
          </div>
          <div className='lg:pb-2'>        
            <Input {...register("password")} label='Password' type="password" name="password" id="password" required  />  
            <p className='text-red-500 lg:text-sm lg:pt-2 '>{errors.password?.message}</p>   
          </div>
          <div className='lg:pb-2'>        
            <Input {...register("confirmPassword")} label='Confirm Password' type="password" name="confirmPassword" id="confirmPassword" required  />  
            <p className='text-red-500 lg:text-sm lg:pt-2 '>{errors.confirmPassword?.message}</p>   
          </div>
          <button type="submit" disabled={loading} className="flex h-[37px] relative w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-blue-900 ">
            {loading ? (
              <div className="size-5   absolute border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign in"
              )} </button>
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
