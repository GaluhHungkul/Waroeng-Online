"use client"

import AuthInputForm from '../tags/AuthInputForm'
import ButtonAuthSubmit from '../tags/ButtonAuthSubmit'
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/tags/Input'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import useDialogAuthCard from '@/zustand/useDialogAuthCard'

const signUpSchema = z.object({
  username : z.string().min(8),
  password : z.string().min(8),
  email : z.string().email("Email tidak valid"),
  confirmPassword : z.string().min(8),
})
.refine((data) => data.password === data.confirmPassword, {
  message : "Password tidak cocok",
  path : ["confirmPassword"]
})

type SignUpSchema = z.infer<typeof signUpSchema>

const SignUpForm = () => {

  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false)
  const { setShowAuthCard } = useDialogAuthCard()

  const { register, handleSubmit, formState : { errors }, reset } = useForm({
    resolver : zodResolver(signUpSchema)
  })
  
  

  const myHandleSignUp = async ({ password, email, username }:SignUpSchema) => {
    setLoadingSignUp(true);
    const signUpLoadingToast = toast.loading("Memproses data...")
    try {
      const resSignUp = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (resSignUp.ok) {
        toast.success("Pendaftaran berhasil")
        toast.dismiss(signUpLoadingToast)
        const signInLoadingToast = toast.loading("Sign In...")
        const resSignIn = await signIn("credentials", {
            email, password,
            redirect : false
        })
        if(!resSignIn?.ok) throw new Error(`${resSignIn?.error}`)
        toast.dismiss(signInLoadingToast)
        toast.success("Login Berhasil")
        setShowAuthCard(null)
        reset()
      } else {
        const { message } = await resSignUp.json();
        toast.error(message)
      }
      
    } catch (error) {
      toast.error("Terjadi kesalahan")
      console.log("error : " + error);
    } finally {
      setLoadingSignUp(false);
      toast.dismiss(signUpLoadingToast)
    }
  }   

  return (
    <form className="space-y-3 w-full md:w-4/5 md:mx-auto lg:space-y-1" method="POST" onSubmit={handleSubmit(myHandleSignUp)}>
        <AuthInputForm errorMessage={errors.username?.message} inputForm={<Input {...register("username")} label='Username' type="text" name="username" id="username" required  />}/>
        <AuthInputForm errorMessage={errors.email?.message} inputForm={<Input {...register("email")} label='Email' type="email" name="email" id="email" required  />}/>
        <AuthInputForm errorMessage={errors.password?.message} inputForm={<Input {...register("password")} label='Password' type="password" name="password" id="password" required  />}/>   
        <AuthInputForm errorMessage={errors.confirmPassword?.message} inputForm={<Input {...register("confirmPassword")} label='Confirm Password' type="password" name="confirmPassword" id="confirmPassword" required  />}/>   
        <ButtonAuthSubmit loadingSubmit={loadingSignUp} submitText="Sign Up"/>
    </form>
  )
}

export default SignUpForm