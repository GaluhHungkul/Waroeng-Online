"use client"

import SkeletonListProducts from "../skeleton/SkeletonListProducts"
import InfiniteScroll from "./InfiniteScroll";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useProductsQuery } from "@/api/productApi";
import Navigasi from "./Navigasi";

const DATA_PER_REQUEST = 12

const ListProducts = dynamic(() => import("../common/ListProducts"))

const ClientProductsPage = () => {

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const paramsPage = Number(params.get("page")) || 1
  const paramsSortBy = params.get("sortBy")
  const paramsOrder = params.get("order")
  const paramsCategory =  params.get("category")

  const { data, isPending, isError, error } = useProductsQuery({
    page : paramsPage,
    sortBy : paramsSortBy ?? "",
    order : paramsOrder ?? "",
    category : paramsCategory ?? ""
  }) 

  if(isPending) return <SkeletonListProducts />
  if(isError) return <p>Error : {error.message}</p>


  return (
    <>
      <Navigasi params={params} />
      <h1 className="font-bold md:text-lg md:mb-4 lg:text-xl lg:mb-8 text-gray-700">All products for you!</h1>
      <div className="lg:mr-12 w-full min-h-screen relative order-2">
        <>
          {data.products.length ? <ListProducts products={data.products} /> 
          :
          <div className="text-center content-center font-bold text-2xl h-[50vh]">
            Products tidak tersedia
          </div>
          }
        </>
        {!isPending && <InfiniteScroll isPending={isPending} params={params} isShowMore={paramsPage * DATA_PER_REQUEST < (data?.total ?? 194) } paramsPage={paramsPage}  />}
      </div>
    </>
  )
}

export default ClientProductsPage