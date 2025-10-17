"use client"

import SkeletonListProducts from "../common/SkeletonListProducts"
import { useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useProductsQuery } from "@/api/productApi";

const ListProducts = dynamic(() => import("../common/ListProducts"))

const ClientProductsPage = () => {

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const { data, isPending, isError, error } = useProductsQuery({
    queries : params.toString()
  })

  const [isNextPage, setIsNextPage] = useState<boolean>(false)
  if(isPending) return <SkeletonListProducts />
  if(isError) return <p>Error : {error.message}</p>

  return (
      <div className="lg:mr-12 p-2 min-h-screen w-full relative order-2">
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
          {!isPending && <InfiniteScroll params={params} isNextPage={isNextPage} setIsNextPage={setIsNextPage} />}
      </div>
  )
}

export default ClientProductsPage