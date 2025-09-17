
import { FC } from 'react'
import { Product } from '@/types/product'
import DetailProduct from '@/components/detailProductPage/DetailProduct'
import SimilarProducts from '@/components/detailProductPage/SimilarProducts'


type Data = {
  product : Product;
  similarProducts : Product[]
}

const fetchDetailProduct = async (id:string) : Promise<Data | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_BASE_API_URL}/products/${id}`)        
    if(!res.ok) throw new Error("Failed to fetch data")
    return res.json() 
  } catch (error) {
    console.log("Error : " , error)
    return null
  }       
}

type Props = {
  params : Promise<{
    id : string
  }>
}

const DetailProductPage : FC<Props> = async (props) => {

  const { id } = await props.params

  const data = await fetchDetailProduct(id)

  return (
    <div className='backdrop-blur-md flex mb-20  min-h-96 shadow-white/20 shadow-md md:flex-row flex-col mt-10 content-center mx-auto lg:gap-20'>
      <div className='flex flex-col items-center mx-auto'>
        <DetailProduct product={data?.product}/>
        <SimilarProducts products={data?.similarProducts}/>
      </div>
    </div>
  )
}

export default DetailProductPage