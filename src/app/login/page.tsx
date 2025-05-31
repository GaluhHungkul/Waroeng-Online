"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '@/components/tags/Input'
import toast from 'react-hot-toast'

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
    const loadingToast = toast.loading("Memproses informasi user...")
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
        router.push('/');
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
<div className="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8 backdrop-blur-sm">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
  </div>
   
  <div className="mt-10 w-80 mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
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

  )
}

export default LoginPage