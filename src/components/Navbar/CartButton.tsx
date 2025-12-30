import useCart from '@/zustand/useCart'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartButton = () => {

    const { cart } = useCart()

  return (
    <Link  title="See your cart" href={"/cart"} className='relative'>
        <ShoppingCart className="hover:text-primary-orange text-gray-700"/>
        {!!cart.length && <span className='absolute -top-2 -right-2 bg-primary-orange text-white font-bold px-1.5 text-sm rounded-full '>{cart.length}</span>}
    </Link>
  )
}

export default CartButton