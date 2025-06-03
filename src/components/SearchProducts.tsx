"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const SearchProducts = () => {

  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch = (e:FormEvent) => {
    e.preventDefault()
    if(!searchQuery.trim().length) return
    router.push(`/products?search=${searchQuery}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center mx-auto lg:w-1/2  lg:gap-2 justify-center">
      <input type="text" placeholder="Cari Product" required value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)} className="rounded-full lg:px-4 duration-300 lg:w-2/3 lg:py-1 focus:outline-none lg:text-lg"/>
      <button className="bg-white font-bold  lg:w-40 lg:py-1 rounded-full lg:text-lg hover:bg-white/70 active:bg-white/50 ">Search</button>
    </form>
  )
}

export default SearchProducts