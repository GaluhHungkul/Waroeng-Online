"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/tags/Input'
import { toast } from 'sonner'
import GoogleLoginButton from '@/components/tags/GoogleLoginButton'
import AuthInputForm from '@/components/tags/AuthInputForm'
import ButtonAuthSubmit from '@/components/tags/ButtonAuthSubmit'
import { signIn } from 'next-auth/react'

const loginSchema = z.object({
  password : z.string().min(8),
  email : z.string().email("Email tidak valid")
})

type LoginSchema = z.infer<typeof loginSchema>

const LoginPage = () => {

  const router = useRouter()

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
      toast.success("Login berhasil")
      toast.loading("Redirecting...", {
        duration : 1
      })
      router.push('/');

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
    <div style={{ backgroundImage : "url(/assets/img/bg.jpg)" }} className='pt-5 bg-cover bg-center min-h-screen relative content-center'>
      <div className='absolute inset-0 backdrop-blur-md'/>
      <div className="pt-10 bg-gray-200/70 items-center w-4/5 md:w-2/5 pb-8 lg:px-8 backdrop-blur-sm border border-gray-300 lg:w-1/3  shadow-xl mx-auto rounded-xl md:scale-150 lg:scale-y-110 lg:scale-100 ">
        <h2 className="text-center text-xl lg:text-2xl font-bold text-black lg:mt-5">Sign in to your account</h2>             
        <div className="mt-10 w-full  flex flex-col items-center">
          <form className="space-y-6 mb-4 w-full "  method="POST" onSubmit={handleSubmit(myHandleSubmit)}> 
            <AuthInputForm  errorMessage={errors.email?.message} inputForm={<Input {...register("email")} label='Email' type="email" name="email" id="email" required  />}/>
            <AuthInputForm errorMessage={errors.password?.message} inputForm={<Input {...register("password")} label='Password' type="password" name="password" id="password" required  />}/>   
            <ButtonAuthSubmit loadingSubmit={loadingSubmitLogin} />
          </form>
          <GoogleLoginButton />
          <p className="mt-10 w-4/5 text-center text-sm text-gray-500">
            Did not have an account yet ?
            <Link href='/register' className="font-semibold text-indigo-600 hover:text-indigo-500"> Register here!</Link>      
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage