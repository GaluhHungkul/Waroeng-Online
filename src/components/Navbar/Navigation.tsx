import Link from "next/link"
import AccountAndSearchBar from "./AccountAndSearchBar"
import CartButton from "./CartButton"

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
    <div className="hidden lg:flex items-center gap-10 justify-between w-1/2 lg:w-3/5">
      <section className="flex gap-8">
        {navigation.map(nav => (
          <Link key={nav.id} className="text-gray-400 hover:text-gray-500 lg:text-lg font-bold" href={nav.href} >
          {nav.title}
        </Link>
        ))}
      </section>
      <div className="order-1 flex items-center gap-16 lg:order-3">  
        <CartButton />
        <AccountAndSearchBar />
      </div>
    </div>
  )
}

export default Navigation