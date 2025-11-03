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

const signInSchema = z.object({
  password : z.string().min(8),
  email : z.string().email("Email tidak valid")
})

type SignInSchema = z.infer<typeof signInSchema>

const SignInForm = () => {

  const { setShowAuthCard } = useDialogAuthCard()

  const { register, handleSubmit, formState : { errors },reset } = useForm({
    resolver : zodResolver(signInSchema)
  })

  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false)

  const myHandleSignIn = async ({password, email}: SignInSchema) => {
    const loadingToast = toast.loading("Memproses data login...")
    try {
      setLoadingSignIn(true);    
      const res = await signIn("credentials", {
        redirect : false,
        email, password
      })      
      
      if(!res?.ok) throw new Error(`${res?.error}`)      

      reset()
      toast.success("Selamat Datang!")
      setShowAuthCard(null)
    } catch (error) {
      let errorMessage = "Login gagal"
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
      toast.error(`Login gagal : ${errorMessage}`)
    } finally {
      toast.dismiss(loadingToast)       
      setLoadingSignIn(false);
    }
  }   

  return (
    <form className="space-y-6 w-full md:w-4/5 md:mx-auto "  method="POST" onSubmit={handleSubmit(myHandleSignIn)}> 
        <AuthInputForm  errorMessage={errors.email?.message} inputForm={<Input {...register("email")} label='Email' type="email" name="email" id="email" required  />}/>
        <AuthInputForm errorMessage={errors.password?.message} inputForm={<Input {...register("password")} label='Password' type="password" name="password" id="password" required  />}/>   
        <ButtonAuthSubmit loadingSubmit={loadingSignIn} />
    </form>
  )
}

export default SignInForm