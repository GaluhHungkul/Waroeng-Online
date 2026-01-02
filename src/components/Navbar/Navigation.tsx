import Link from "next/link"

const navigation = [
  {
    id : 1, 
    title : "Home",
    href : "/"
  },
  {
    id : 2, 
    title : "Products",
    href : "/products"
  },
  {
    id : 3, 
    title : "About",
    href : "/"
  },
]


const Navigation  = () => {
  return (
    <div className="hidden lg:flex items-center gap-10 justify-center w-1/2 lg:w-3/5">
      {navigation.map(nav => (
        <Link key={nav.id} className="text-gray-400 hover:text-gray-500 lg:text-lg font-bold" href={nav.href} >
        {nav.title}
      </Link>
      ))}
    </div>
  )
}

export default Navigation