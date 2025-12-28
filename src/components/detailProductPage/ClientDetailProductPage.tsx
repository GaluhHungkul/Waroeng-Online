"use client"

import { useDetailProductQuery } from '@/api/productApi'
import DetailProductComponent from './DetailProductComponent'
import SimilarProducts from './SimilarProducts'
import SkeletonDetailProduct from '../skeleton/SkeletonDetailProduct'
import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ClientDetailProductPage = ({ id } : { id : string }) => {

  const { data, isPending, isError, error } = useDetailProductQuery({ id })

  const router = useRouter()

  if(isPending) return <SkeletonDetailProduct />
  if(isError) return <p>Error : {error.message}</p>

  return (
    <div className='backdrop-blur-md flex mb-20 min-h-96 shadow-white/20 shadow-md flex-col items-center mt-4 mx-auto lg:gap-20 w-[90%] md:mt-8 lg:w-4/5'>
        <button title='Back to previous page' className='mr-auto mb-4 text-gray-700' onClick={() => router.back()}>
          <ArrowLeftCircle size={32}/>
        </button>
        <DetailProductComponent product={data.detailProduct}/>
        <SimilarProducts  data={data.similarProducts}/>
    </div>
  )
}

export default ClientDetailProductPage