"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/tags/Input'
import toast from 'react-hot-toast'
import BackgroundAnimation from '@/components/BackgroundAnimation'

const loginSchema = z.object({
  username : z.string().min(8),
  password : z.string().min(8)
})

type LoginSchema = z.infer<typeof loginSchema>

const LoginPage = () => {

  const router = useRouter()

  const { register, handleSubmit, formState : { errors },reset } = useForm({
    resolver : zodResolver(loginSchema)
  })

  const [loadingSubmitLogin, setLoadingSubmitLogin] = useState<boolean>(false)

  const myHandleSubmit = async ({username, password}:LoginSchema) => {             
    const loadingToast = toast.loading("Memproses data...")
    try {
      setLoadingSubmitLogin(true);    
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });        
      
      if (res.ok) {        
        reset()
        toast.success("Berhasil login")
        const redirectingLoadingToast = toast.loading("Redirecting...")
        router.push('/');
        toast.dismiss(redirectingLoadingToast)
      } else {
        const { message } = await res.json()
        toast.error(message)
      }
      setLoadingSubmitLogin(false);
    } catch (error) {
      setLoadingSubmitLogin(false);
      toast.error("Terjadi kesalahan ketika mengirim data")
      console.error('Error:', error);
    }
    toast.dismiss(loadingToast)      

  }   

  return (
    <div style={{ backgroundImage : "url(/assets/img/bg.jpg)" }} className='lg:pt-10 bg-cover bg-center min-h-screen relative'>
      <div className='absolute inset-0 backdrop-blur-md'/>
      <div className="flex min-h-[85vh] bg-gray-200/70 justify-center flex-col  px-6 py-12 lg:px-8 backdrop-blur-sm border border-gray-300 lg:w-1/3  shadow-xl mx-auto  rounded-xl">
        <h2 className="text-center text-2xl font-bold text-black lg:mt-5">Log in to your account</h2>             
        <div className="mt-10 w-80 mx-auto sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6"  method="POST" onSubmit={handleSubmit(myHandleSubmit)}> 
            <div className='lg:pb-2'>
              <Input {...register("username")} label='Username' type="text" name="username" id="username" required showIcon />
              <p className='text-red-500 lg:text-sm lg:pt-2 '>{errors.username?.message}</p>
            </div>
            <div className='lg:pb-2'>        
              <Input {...register("password")} label='Password' type="password" name="password" id="password" required showIcon />  
              <p className='text-red-500 lg:text-sm lg:pt-2 '>{errors.password?.message}</p>   
            </div>

            <div>      
            <button type="submit" disabled={loadingSubmitLogin} className="flex h-[37px] relative w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-blue-900 " >             
              {loadingSubmitLogin ? (
                <div className="size-5   absolute border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign in"
              )}
            </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
          Did not have an account yet ?
          <Link href='/register' className="font-semibold text-indigo-600 hover:text-indigo-500"> Register here!</Link>      
          </p>
        </div>
      </div>
      <BackgroundAnimation />
    </div>
  )
}

export default LoginPage