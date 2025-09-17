import { Product } from '@/types/product'
import Image from 'next/image'
import React from 'react'
import CurrencyFormatter from '../CurrencyFormatter'
import DialogBuyProduct from './DialogBuyProduct'

const DetailProduct = ({ product } : { product : Product | null | undefined }) => {
  return (
    <div className='mb-20 relative md:flex lg:mb-40 w-[80vw] '>
      <section className='relative aspect-[1/1] w-full lg:flex-1'>
        <Image src={product?.img || 'https://placehold.co/200x200.png'} alt={product?.name ?? ""} fill sizes='90vw' className='object-center object-cover rounded'/>
      </section>
      <section className='p-4 relative flex flex-col gap-3 font-bold lg:text-xl lg:flex-2 lg:pl-8 lg:pt-0'>
        <p className='font-semibold text-gray-500'>{product?.category}</p>
        <p>Nama Product : <span className='font-normal text-gray-500'>{product?.name}</span></p>
        <p>Harga : <span className='font-normal text-gray-500'><CurrencyFormatter amount={product?.price || 0}/></span></p>
        <p>Deskripsi : <span className='font-normal text-gray-500'>{product?.description}</span></p>
        <p>Rate : <span className='font-normal text-gray-500'>{product?.rate.value}</span> ⭐ | <span className='font-normal text-gray-500'>{product?.rate.count} reviews</span>  </p>
      </section>
      <DialogBuyProduct product={product}/>
    </div>
  )
}

export default DetailProduct