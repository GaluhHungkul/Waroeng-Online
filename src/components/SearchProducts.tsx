"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const SearchProducts = () => {

  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch = (e:FormEvent) => {
    e.preventDefault()
    router.push(`/products?search=${searchQuery}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center mx-auto lg:w-1/2 lg:mt-14 lg:gap-2 justify-center lg:h-20">
      <input type="text" required value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="rounded-full border-4 border-black lg:px-4 duration-300 lg:w-2/3 lg:h-full lg:py-2 focus:outline-none lg:text-2xl"/>
      <button className="bg-black text-white  font-bold lg:px-4 lg:w-40 lg:h-full lg:py-2 rounded-full lg:text-2xl hover:bg-black/80 active:bg-black/60 ">Search</button>
    </form>
  )
}

export default SearchProducts