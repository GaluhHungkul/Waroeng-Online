"use client"

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import SkeletonDetailProduct from '@/components/skeleton/SkeletonDetailProduct'
import DetailProduct from '@/components/detailProductPage/DetailProduct'
import SimilarProducts from '@/components/detailProductPage/SimilarProducts'

type Data = {
  product : Product;
  similarProducts : Product[]
}

const DetailProductPage = () => {

    const { id } = useParams()

    const [loadingFetchData, setLoadingFetchData] = useState<boolean>(false)
    const [data, setData] = useState<Data | null>(null)    

    useEffect(() => {
      const fetchingData = async () => {
        setLoadingFetchData(true)
        try {
          const response = await fetch(`/api/products/${id}`)        
          if(!response.ok) throw new Error("Failed to fetch data")
          const results = await response.json()
          console.log(results)
          setData(results)
        } catch (error) {
          console.log("Error : " , error)
        }
        setLoadingFetchData(false)
      }       
        fetchingData()
    }, [id])

  return (
    <div className='backdrop-blur-md flex mb-20 w-4/5 rounded  min-h-96 shadow-white/20 shadow-md md:flex-row flex-col mt-10 content-center mx-auto lg:gap-20'>
      {loadingFetchData ? <SkeletonDetailProduct /> : 
      <div className='flex flex-col bg-'>
        <DetailProduct product={data?.product}/>
        <SimilarProducts products={data?.similarProducts}/>
      </div>
      }
    </div>
  )
}

export default DetailProductPage