import useProducts from "@/zustand/useProducts"
import {  FC, useState } from "react"

type Props = {
    params : URLSearchParams;
    isNextPage : boolean;
    setIsNextPage : (value:boolean) => void
}

const InfiniteScroll : FC<Props> = ({ params, isNextPage, setIsNextPage  }) => {

  const [page, setPage] = useState<number>(1)
  const { products, setProducts } = useProducts()  
  const [loadingGetShowMore, setLoadingGetShowMore] = useState<boolean>(false)

  const handleShowMoreProducts = async () => {
    setLoadingGetShowMore(true)
    try {
        setPage(p => p + 1)
        params.set("page", (page + 1).toString())
        const res = await fetch(`/api/products?${params.toString()}`)
        if(!res.ok) throw new Error("Failed to fetch data")
        const { products : newProducts, isNextPage : nextPage } = await res.json()
        setProducts([...products, ...newProducts])
        setIsNextPage(nextPage)
    } catch (error) {
        console.log("Error : " , error)
    } finally {
        setLoadingGetShowMore(false)
    }
  }

  if(!isNextPage) return null

  return <button onClick={handleShowMoreProducts} disabled={loadingGetShowMore}  className="absolute right-1/2 translate-x-1/2 border-2 border-black w-1/2 font-semibold text-xl py-1 rounded hover:bg-black hover:text-white active:bg-black/80 duration-100 disabled:bg-black/70 disabled:border-none disabled:text-white">{loadingGetShowMore ? "Loading..." : "Show more"}</button>
}

export default InfiniteScroll