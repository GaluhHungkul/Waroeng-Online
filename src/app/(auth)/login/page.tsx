import AnimatedLoginBackground from '@/components/Login/AnimatedLoginBackground'
import LoginForm from '@/components/Login/LoginForm'
import GoogleLoginButton from '@/components/tags/GoogleLoginButton'
import Link from 'next/link'

const LoginPage = () => {  

  return (
    <AnimatedLoginBackground className='pt-5 bg-cover bg-center min-h-screen relative content-center'>
      <div className="pt-10 bg-gray-300 items-center w-4/5 md:w-2/5 pb-8 lg:px-8 backdrop-blur-sm border border-gray-300 lg:w-1/3  shadow-xl mx-auto rounded-xl md:scale-150 lg:scale-y-110 lg:scale-100 ">
        <h2 className="text-center text-xl lg:text-2xl font-bold text-gray-500 lg:mt-5">Sign in to your account</h2>             
        <div className="mt-10 w-full  flex flex-col items-center">
          <LoginForm />
          <GoogleLoginButton />
          <p className="mt-10 w-4/5 font-semibold text-center text-sm text-gray-500">
            Did not have an account yet ?
            <Link href='/register' className="text-indigo-600 hover:text-indigo-500"> Register here!</Link>      
          </p>
        </div>
      </div>
    </AnimatedLoginBackground>
  )
}

export default LoginPage