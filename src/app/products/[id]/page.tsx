"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Products } from '@/types/products'
import Image from 'next/image'
import CurrencyFormatter from '@/components/CurrencyFormatter'
import { Skeleton } from '@/components/ui/skeleton'

const DetailProductPage = () => {

    const { id } = useParams()


    const [loadingFetchData, setLoadingFetchData] = useState<boolean>(false)
    const [product, setProduct] = useState<Products | null>(null)    

    useEffect(() => {
      const fetchingData = async () => {
        setLoadingFetchData(true)
        try {
          const response = await fetch(`/api/products/${id}`)        
          if(!response.ok) throw new Error("Failed to fetch data")
          const result = await response.json()
          setProduct(result.product)
        } catch (error) {
          console.log("Error : " , error)
        }
        setLoadingFetchData(false)
      }       
        fetchingData()
    }, [id])

  return (
    <div className='backdrop-blur-md flex mb-20 w-4/5  min-h-96 shadow-white/20 shadow-md md:flex-row flex-col mt-10 content-center mx-auto border-2 border-gray-400'>
        {loadingFetchData 
        ?
        <>
          <Skeleton className='flex-1 bg-gray-200'/>
          <div className='flex-1 lg:pt-10 lg:px-4 lg:space-y-4'>
            {Array.from({length : 10}).map((_, index) => (
              <Skeleton key={index} className='lg:h-4'/>
            ))}
          </div>
        </>
        :
        <>
        <Image src={product?.img || 'https://placehold.co/200x200.png?'} alt={product?.name || 'DefaultHungkul'} width={900} height={900} className='md:w-3/4 lg:w-1/2'/>
        <div className='p-10 flex flex-col gap-3 bg-'>
          <p>Nama Product : <span className='text-gray-400'>{product?.name}</span></p>
          <p>Harga : <span className='text-gray-400'><CurrencyFormatter amount={product?.price || 0}/></span></p>
          <p>Deskripsi Product : <br /><span className='text-gray-400'>{product?.description}</span></p>
          <p>Category : <span className='text-gray-400'>{product?.category}</span></p>
          <p>Rate : <span className='text-gray-400'>{product?.rate.value}</span> ⭐ | <span className='text-gray-400'>{product?.rate.count} reviews</span>  </p>
        </div>
        </>
        }
    </div>
  )
}

export default DetailProductPage