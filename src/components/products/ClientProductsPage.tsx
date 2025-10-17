"use client"

import SkeletonListProducts from "../common/SkeletonListProducts"
import InfiniteScroll from "./InfiniteScroll";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useProductsQuery } from "@/api/productApi";

const DATA_PER_REQUEST = 12

const ListProducts = dynamic(() => import("../common/ListProducts"))

const ClientProductsPage = () => {

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const paramsPage = Number(params.get("page")) || 1


  const { data, isPending, isError, error } = useProductsQuery({
    page : paramsPage
  })

  if(isPending) return <SkeletonListProducts />
  if(isError) return <p>Error : {error.message}</p>


  return (
      <div className="lg:mr-12 w-full p-2 min-h-screen relative order-2">
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
  )
}

export default ClientProductsPage