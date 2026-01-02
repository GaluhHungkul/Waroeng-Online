import { Minus, Plus, Trash } from 'lucide-react';
import React from 'react'
import CurrencyFormatter from '../CurrencyFormatter';
import { Button } from '../ui/button';
import useCart from '@/zustand/useCart';
import { ProductInCart } from '@/types/cart';
import Link from 'next/link';

const DetailCardItem = (product : ProductInCart ) => {

    const { title, priceAfterDiscount, id, qty, } = product

    const { addToCart, deleteFromCart, removeFromCart } = useCart()

  return (
    <div className='flex-1 lg:p-4'>
        <section className='flex items-start justify-between gap-2'>
            <Link href={`/products/detail/${id}`} className='line-clamp-2 font-medium' title={title}>{title}</Link>
            <button onClick={() => removeFromCart(id)}>
                <Trash className='text-red-400'/>
            </button>
        </section>
        <p className='line-clamp-2 mt-4 font-medium'><CurrencyFormatter amount={priceAfterDiscount}/></p>
        <section className='flex items-center justify-center gap-4 mt-4 border-b pb-4'>
            <Button onClick={() => deleteFromCart(id)}><Minus /></Button>
            <p className='text-xl'>{qty}</p>
            <Button onClick={(e) => {
                e.preventDefault()
                addToCart(product)
            }}><Plus /></Button>
        </section>
        <section className='flex justify-between items-center mt-6'>
            <p className='font-medium'>Subtotal</p>
            <p className='font-bold'><CurrencyFormatter amount={priceAfterDiscount * qty}/></p>
        </section>
    </div>
  )
}

export default DetailCardItem