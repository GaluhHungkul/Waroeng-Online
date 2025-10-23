"use client"

import { useDetailProductQuery } from '@/api/productApi'
import DetailProduct from './DetailProduct'
import SimilarProducts from './SimilarProducts'
import SkeletonDetailProduct from '../skeleton/SkeletonDetailProduct'

const ClientDetailProductPage = ({ id } : { id : string }) => {

    const { data, isPending, isError, error } = useDetailProductQuery({ id })

    if(isPending) return <SkeletonDetailProduct />
    if(isError) return <p>Error : {error.message}</p>
  return (
    <div className='backdrop-blur-md flex mb-20 min-h-96 shadow-white/20 shadow-md flex-col items-center mt-4 mx-auto lg:gap-20 w-[90%]'>
        <DetailProduct product={data.detailProduct}/>
        <SimilarProducts products={data.similarProducts}/>
    </div>
  )
}

export default ClientDetailProductPage