import { Book, Heart, Hospital, Monitor, Pizza, Shirt } from "lucide-react"
import Link from "next/link"

const navData = [
    {
        name :"Makanan",
        icon :  <Pizza />,
    },
    {
        name :"Elektronik",
        icon :  <Monitor />,
    },
    {
        name :"Kesehatan",
        icon :  <Hospital />,
    },
    {
        name :"Fashion",
        icon :  <Shirt />,
    },
    {
        name :"Kecantikan",
        icon :  <Heart />,
    },
    {
        name :"Buku",
        icon :  <Book />,
    },
]

const SideBar = () => {
  return (
    <div className="flex flex-col text-sm">
        {navData.map(item => (
            <Link
            href={`/products?category=${item.name.toLowerCase()}`} 
            key={item.name}
            className="border px-2 py-4 hover:bg-black/10"
            >
                {item.name}
            </Link>
        ))}
    </div>
  )
}

export default SideBar