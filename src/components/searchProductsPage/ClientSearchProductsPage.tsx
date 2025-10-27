"use client"

import { useSearchProductsQuery } from "@/api/productApi"
import { useSearchParams } from "next/navigation"
import Navigasi from "../products/Navigasi"
import SkeletonListProducts from "../skeleton/SkeletonListProducts"
import InfiniteScroll from "../products/InfiniteScroll"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ListSearchProducts from "./ListSearchProducts"

const DATA_PER_REQUEST = 12

const ClientSearchProductsPage = () => {

  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams)

  const paramsQ = params.get("q") || "phone"
  const paramsPage = Number(params.get("page")) || 1
  const paramsSortBy = params.get("sortBy") || ""
  const paramsOrder = params.get("order") || ""

  const { data, isPending, isError, error } = useSearchProductsQuery({
      q : paramsQ,
      page : paramsPage,
      sortBy : paramsSortBy,
      order : paramsOrder
  })
  if(isPending) return <SkeletonListProducts isSearchProductsPage/>
  if(isError) return <p>Error : {error.message}</p>

  return (
    <>
     <Navigasi params={params} searchProductsPage />
      <h1 className="font-bold md:text-lg md:mb-4 text-gray-700">All products for you!</h1>
      <div className="lg:mr-12 w-full min-h-screen relative order-2">
        <>
          {data.products.length ? <ListSearchProducts page={paramsPage} sortBy={paramsSortBy} order={paramsOrder} q={paramsQ}/> 
          :
          <div className="text-center content-center h-[50vh]">
            <h1 className="font-bold text-2xl text-gray-500">Products tidak ditemukan</h1>
            <Link href={"/products"} className="text-blue-700 hover:underline flex items-center justify-center gap-2 text-xl font-semibold">Lihat semua product<ArrowRight strokeWidth={4} /></Link>
          </div>
          }
        </>        
        {!isPending && <InfiniteScroll isPending={isPending} params={params} isShowMore={paramsPage * DATA_PER_REQUEST < (data?.total ?? 194) } paramsPage={paramsPage}  />}
      </div>   
    </>
  )
}

export default ClientSearchProductsPage