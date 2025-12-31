"use client"

import SkeletonHistoryShopping from "@/components/skeleton/SkeletonHistoryShopping"
import HistoryShopping from "."
import { useHistoryShopping } from "@/api/historyShoping"

const ListHistoryShopping = () => {

 const { data:historyShopping, isPending, isError, error } = useHistoryShopping()

 if(isPending) return <SkeletonHistoryShopping />
if(isError) return <p>Error : {error.message}</p>
  return (
    <div>
        {historyShopping?.length 
          ? 
          <div className="flex flex-col gap-4">
            {historyShopping?.map((order) => (
                <HistoryShopping order={order} key={order._id}/>   
            ))}
          </div> 
          : 
          <h1 className='font-bold lg:text-2xl text-center lg:mt-32'>Anda tidak pernah melakukan transaksi</h1>
        }
    </div>
  )
}

export default ListHistoryShopping