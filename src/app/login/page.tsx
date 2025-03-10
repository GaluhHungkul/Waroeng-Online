"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import  { useState } from 'react'


const LoginPage = () => {

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()       
        
        if(username.trim() == '') return 
        if(password.trim() == '') return 
       
        try {
          setLoading(true);
        
          const result = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
        
          const response = await result.json();
          setLoading(false);
        
          if (result.ok) {
           
            router.push('/');
          } else if (result.status === 404) {
            setError(response.message); // User not found
          } else if (result.status === 401) {
            setError(response.message); // Wrong password
          } else {
            setError('An unexpected error occurred.');
          }
        } catch (error) {
          setLoading(false);
          setError('Network error. Please try again later.');
          console.error('Error:', error);
        }
        

    }

   

  return (
<div className="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8 backdrop-blur-sm">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
  </div>
   
  <div className="mt-10 w-80 mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6"  method="POST" onSubmit={handleSubmit}>
      <div>
        <div className="mt-2">
          <input onChange={(e) => setUsername(e.target.value)}  type="text" name="username" id="username" placeholder='Username' autoComplete="username" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          {username.trim() == '' && !!username.length && <p className='text-red-700 mt-1'>Username cannot be empty</p>}
          {error?.includes('username') && <p className='text-red-700 mt-1'>{error}</p>}
        </div>
      </div>

      <div>
        <div className="mt-2">
          <input  onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
         {password.trim() == ''&& !!password.length && <p className='text-red-700 mt-1'>Password cannot be empty</p>}
         {error?.includes("password") && <p className='text-red-700 mt-1'>{error}</p>}
        </div>
      </div>

      

      <div>
      
      {error?.includes('Unexpected') && <p className='text-red-700 mt-1'>{error}</p>}
      <button
              type="submit"
              disabled={loading}
              className="flex h-[37px] relative w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-blue-900 "
            >
              {" "}
              {loading ? (
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