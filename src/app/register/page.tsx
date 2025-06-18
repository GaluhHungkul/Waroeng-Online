"use client";

import AuthInputForm from "@/components/tags/AuthInputForm";
import ButtonAuthSubmit from "@/components/tags/ButtonAuthSubmit";
import Input from "@/components/tags/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const registerSchema = z.object({
  username : z.string().min(8),
  password : z.string().min(8),
  email : z.string().email("Email tidak valid"),
  confirmPassword : z.string().min(8),
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

  const [loadingSubmitRegister, setLoadingSubmitRegister] = useState<boolean>(false)


  const myHandleSubmit = async ({username, password, email}:RegisterSchema) => {   
    setLoadingSubmitRegister(true);
    const loadingToast = toast.loading("Memproses data...")
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (res.ok) {
        reset()
        toast.success("Pendaftaran berhasil")
        const loadingToast = toast.loading("Redirecting")
        router.push("/login")
        toast.dismiss(loadingToast)
      } else {
        const { message } = await res.json();
        toast.error(message)
      }
      
    } catch (error) {
      toast.error("Terjadi kesalahan")
      console.log("error : " + error);
    }
    setLoadingSubmitRegister(false);
    toast.dismiss(loadingToast)
  };

  return (
    <div style={{ backgroundImage : "url(/assets/img/bg.jpg)" }} className="pt-5 min-h-screen bg-cover bg-center relative">
      <div className="absolute inset-0 backdrop-blur-md"/>
      <div className="flex w-4/5  min-h-full flex-col items-center p-6 lg:px-8 backdrop-blur-sm lg:w-1/3 mx-auto bg-gray-200/70 rounded-xl">
      <h2 className="mt-10 text-center text-xl lg:text-2xl font-bold  text-black">
        Create your account
      </h2>
      <div className="mt-10 w-80 lg:w-full relative left-8 lg:left-12">
        <form className="space-y-6 " method="POST" onSubmit={handleSubmit(myHandleSubmit)}>
          <AuthInputForm errorMessage={errors.username?.message} inputForm={<Input {...register("username")} label='Username' type="text" name="username" id="username" required  />}/>
          <AuthInputForm errorMessage={errors.email?.message} inputForm={<Input {...register("email")} label='Email' type="email" name="email" id="email" required  />}/>
          <AuthInputForm errorMessage={errors.password?.message} inputForm={<Input {...register("password")} label='Password' type="password" name="password" id="password" required  />}/>   
          <AuthInputForm errorMessage={errors.confirmPassword?.message} inputForm={<Input {...register("confirmPassword")} label='Confirm Password' type="password" name="confirmPassword" id="confirmPassword" required  />}/>   
          <ButtonAuthSubmit loadingSubmit={loadingSubmitRegister} submitText="Sign Up"/>
        </form>
        <p className="mt-10 relative right-8 text-center text-sm/6 text-gray-500">
          Already have an account?
          <Link href='/login' className="font-semibold text-indigo-600 hover:text-indigo-500"> Click here!</Link>      
        </p>
      </div>
      </div>
    </div>
  );
};

export default RegisterPage;
