import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className='text-center content-center font-semibold text-2xl h-[80vh] flex flex-col items-center justify-center'>
        <h1 className='text-8xl font-bold'>404</h1>
        <p>Page Not Found</p>
        <Link href={"/"} className="text-blue-800 hover:underline">Back to Dashboard</Link>
    </div>
  )
}

export default NotFoundPage