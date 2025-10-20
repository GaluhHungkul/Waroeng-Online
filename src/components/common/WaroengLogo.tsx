import Link from 'next/link'

const WaroengLogo = () => {
  return (
    <Link href={"/"} className='text-blue-500  font-bold text-lg md:text-2xl '>
      Waroeng<span className='text-primary-orange'>Online</span>.
    </Link>
  )
}

export default WaroengLogo