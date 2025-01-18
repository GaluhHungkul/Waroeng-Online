"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Products } from '@/types/products'
import Image from 'next/image'
import CurrencyFormatter from '@/app/Components/CurrencyFormatter'

const DetailProductPage = () => {

    const params = useParams()

    const { id } = params

    const [product, setProduct] = useState<Products | null>(null)
    

    useEffect(() => {
      const fetchingData = async () => {
        const response = await fetch(`/api/products/${id}`)
        
        if(response.ok) {
          const result = await response.json()
          setProduct(result.product)
          console.log(result)
        } else {
          console.log('something went wrong ! 😭')
        }        
      }
      fetchingData()
    }, [id])

  return (
    <div className='backdrop-blur-md flex w-3/5 min-h-96 shadow-white/20 shadow-xl bg-gradient-to-br from-gray-800 to-gray-800 via-gray-700 mt-10 content-center mx-auto'>
        <Image src={product?.img || 'https://placehold.co/200x200.png?text=Default Image'} alt={product?.name || 'DefaultHungkul'} width={900} height={900} className='w-1/2'/>
        <div className='p-10 flex flex-col gap-3'>
          <p>Nama Product : <span className='text-gray-400'>{product?.name}</span></p>
          <p>Harga : <span className='text-gray-400'><CurrencyFormatter amount={product?.price || 0}/></span></p>
          <p>Deskripsi Product : <br /><span className='text-gray-400'>{product?.description}</span></p>
          <p>Category : <span className='text-gray-400'>{product?.category}</span></p>
          <p>Rate : <span className='text-gray-400'>{product?.rate.value}</span> ⭐ | <span className='text-gray-400'>{product?.rate.count} reviews</span>  </p>
        </div>
    </div>
  )
}

export default DetailProductPage