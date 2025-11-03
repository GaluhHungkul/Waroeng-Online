import CurrencyFormatter from '@/components/CurrencyFormatter'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TotalPriceAndNavigation = ({ id, totalPrice } : { id : string;totalPrice : number }) => {
  return (
    <section className="flex items-center justify-between md:text-xl">
        <p className='capitalize  text-sm md:text-xl font-semibold bottom-4'>Total harga : <CurrencyFormatter amount={totalPrice} /></p>
        <Link href={`/products/detail/${id}`} className="bg-primary-orange text-white px-4 py-1 rounded font-semibold flex items-center gap-2 hover:brightness-90 md:px-8 md:py-1.5 lg:gap-4"><ShoppingCart />Beli lagi</Link>
    </section>
  )
}

export default TotalPriceAndNavigation