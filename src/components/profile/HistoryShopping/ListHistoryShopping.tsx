"use client"

import SkeletonHistoryShopping from "@/components/skeleton/SkeletonHistoryShopping"
import HistoryShopping from "."
import { useHistoryShopping } from "@/api/historyShoping"
import { useSearchParams } from "next/navigation"

const ListHistoryShopping = () => {

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const { data:historyShopping, isPending, isError, error } = useHistoryShopping({ sortBy : params.get("sortBy") ?? "unpaid" })

  if(isPending) return <SkeletonHistoryShopping />
  if(isError) return <p>Error : {error.message}</p>

  return (
    <div>
        {historyShopping?.length 
          ? 
          <>
            <h1 className="font-medium mb-6 text-gray-600">Orders : {historyShopping.length}</h1>
            <div className="flex flex-col gap-4">
              {historyShopping?.map((order) => (
                  <HistoryShopping order={order} key={order._id}/>   
              ))}
            </div> 
          </>
          : 
          <h1 className='font-bold lg:text-2xl text-center lg:mt-32'>Anda tidak pernah melakukan transaksi</h1>
        }
    </div>
  )
}

export default ListHistoryShopping