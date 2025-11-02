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

const loginSchema = z.object({
  password : z.string().min(8),
  email : z.string().email("Email tidak valid")
})

type LoginSchema = z.infer<typeof loginSchema>

const LoginForm = () => {

  const { register, handleSubmit, formState : { errors },reset } = useForm({
    resolver : zodResolver(loginSchema)
  })

  const [loadingSubmitLogin, setLoadingSubmitLogin] = useState<boolean>(false)

  const myHandleSubmit = async ({password, email}:LoginSchema) => {
    const loadingToast = toast.loading("Memproses data login...")
    try {
      setLoadingSubmitLogin(true);    
      const res = await signIn("credentials", {
        redirect : false,
        email, password
      })      
      
      if(!res?.ok) throw new Error(`${res?.error}`)      

      reset()
      toast.success("Selamat Datang!")

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
      setLoadingSubmitLogin(false);
    }
  }   

  return (
    <form className="space-y-6 w-full md:w-4/5 md:mx-auto "  method="POST" onSubmit={handleSubmit(myHandleSubmit)}> 
        <AuthInputForm  errorMessage={errors.email?.message} inputForm={<Input {...register("email")} label='Email' type="email" name="email" id="email" required  />}/>
        <AuthInputForm errorMessage={errors.password?.message} inputForm={<Input {...register("password")} label='Password' type="password" name="password" id="password" required  />}/>   
        <ButtonAuthSubmit loadingSubmit={loadingSubmitLogin} />
    </form>
  )
}

export default LoginForm