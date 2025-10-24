import Link from "next/link"

export const metadata = {
  title : "Page not found : 404",
  description : "Halaman tidak ditemukan"
}

const NotFoundPage = () => {
  return (
    <div className='text-center content-center font-semibold text-2xl inset-0 bg-white z-[99999] flex flex-col items-center justify-center fixed '>
        <h1 className='text-8xl font-bold'>40<span className="text-primary-orange">4</span></h1>
        <p><span className="text-primary-orange">Page</span> not found</p>
        <Link href={"/"} className="text-blue-800 hover:underline">Back to Dashboard</Link>
    </div>
  )
}

export default NotFoundPage