"use client"

import HistoryShopping from '@/components/profile/HistoryShopping'
import { Skeleton } from '@/components/ui/skeleton'
import { Order } from '@/types/order'
import { useEffect, useState } from 'react'

const HistoryShoppingPage = () => {


  const [historyShopping, setHistoryShopping] = useState<Order[]>([])
  const [loadingGetHistoryShopping, setLoadingGetHistoryShopping] = useState<boolean>(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingGetHistoryShopping(true)
        const res = await fetch("/api/user/historyShopping")
        if(!res.ok) throw new Error("Failed to fetch data")
        const results = await res.json()
        console.log(results)
        setHistoryShopping(results)
      } catch (error) {
        console.log("Error : " , error)
      } finally {
        setLoadingGetHistoryShopping(false)
      }
    }
    fetchUser()
  },[])

  return (
    <div className='backdrop-blur-md px-3 py-5 lg:p-10  w-full'>
      <h1 className='text-black lg:text-3xl font-bold mb-10'>History Shopping</h1>
      {loadingGetHistoryShopping ?
        <div className='space-y-20'>
          {Array.from({ length : 3 }).map((_,i) => (
            <div key={i}>
              <Skeleton className='w-2/5 mr-auto bg-black/30 h-4 mb-6'/>
              <Skeleton className='bg-black/30 h-4'/>
              <Skeleton className='bg-black/30 h-4 mt-2'/>
              <Skeleton className='bg-black/30 h-4 mt-2'/>
              <Skeleton className='bg-black/30 h-4 mt-8'/>
              <Skeleton className='w-2/5 ml-auto bg-black/30 h-4 mt-2'/>
            </div>
          ))}
        </div> : 
        <>
        {historyShopping?.length 
          ? <HistoryShopping historyShopping={historyShopping}/>
          : <h1 className='font-bold lg:text-2xl text-center lg:mt-32'>Anda tidak pernah melakukan transaksi</h1>
          }
        </>  
      }
    </div>
  )
}

export default HistoryShoppingPage