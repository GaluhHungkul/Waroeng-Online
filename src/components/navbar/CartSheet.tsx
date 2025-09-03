import useCart from '@/zustand/useCart';
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Cart = () => {

    const { cart } = useCart();
    const qtyEachProduct = cart.length ?  cart.map((product) => product.qty) : []
    const totalQtyCart = qtyEachProduct.length ? qtyEachProduct.reduce((a, b) => a + b) : 0;

  return (
    <div className="relative">
        {!!totalQtyCart && 
        <>
        <span className="absolute bg-green-500 py-[2px] px-2 text-sm -top-4 -right-4 text-white rounded-full">
          {totalQtyCart}
        </span>
        <Link href="/cart">
          <ShoppingCart size={24} className="text-white hover:text-gray-400" />
        </Link>
        </>}
    </div>
  )
}

export default Cart