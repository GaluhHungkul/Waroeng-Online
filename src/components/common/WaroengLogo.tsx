import Link from 'next/link'

const WaroengLogo = ({ userCard=false } : { userCard?: boolean }) => {
  return (
    <Link href={"/"} className={`text-blue-500 md:inline font-bold text-lg  ${userCard ? "md:text-xl" : "hidden md:text-2xl"}`}>
      Waroeng<span className='text-primary-orange'>Online</span>.
    </Link>
  )
}

export default WaroengLogo