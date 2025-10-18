"use client"

import { useSearchProductsQuery } from "@/api/productApi"
import { useSearchParams } from "next/navigation"
import Navigasi from "../products/Navigasi"
import SkeletonListProducts from "../common/SkeletonListProducts"
import ListProducts from "../common/ListProducts"
import InfiniteScroll from "../products/InfiniteScroll"

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

    if(isError) return <p>Error : {error.message}</p>

  return (
    <>
     <Navigasi params={params} searchProductsPage />
      <h1 className="font-bold md:text-lg md:mb-4">All products for you!</h1>
      <div className="lg:mr-12 w-full min-h-screen relative order-2">
        {isPending ?  <SkeletonListProducts /> 
        :
        <>
          {data.products.length ? <ListProducts products={data.products} /> 
          :
          <div className="text-center content-center font-bold text-2xl h-[50vh]">
            Products tidak tersedia
          </div>
          }
        </>
        }
        {!isPending && <InfiniteScroll params={params} isShowMore={paramsPage * DATA_PER_REQUEST < (data?.total ?? 194) } paramsPage={paramsPage}  />}
      </div>   
    </>
  )
}

export default ClientSearchProductsPage