"use client"

import React, { useEffect, useState } from 'react'
import { TypeUser } from '@/types/user'
import CurrencyFormatter from '@/app/Components/CurrencyFormatter'
import Link from 'next/link'

const HistoryShoppingPage:React.FC = () => {

    const [user, setUser] = useState<TypeUser | null>(null)

    
    useEffect(() => {
        const fetchingUser = async () => {
            const response = await fetch('/api/user')
            const result = await response.json()
            console.log(result)
            setUser(result.currUser)
        }
        fetchingUser()
    },[])

  return (
    <div className='backdrop-blur-md px-3 py-5 lg:p-10  w-full'>
        <h1 className='text-gray-400 mb-10'>History Shopping</h1>
        {user?.historyShopping.length 
        ? 
          <div className=' w-full'>
            { user.historyShopping.map((history, index) => (
            <div key={index} className='relative pb-10 mb-10 border-b'>
              <h1 className='text-gray-500'>Transaksi pada  {new Date(history.purchasedAt).toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
              })}
              </h1>
              <table border={1}  className='text-[12px] bg-gradient-to-br w-full lg:text-lg from-gray-900 to-gray-900 via-gray-800 gap-4 my-5 px-4 py-2'>
                <thead className='border border-gray-500'>
                  <tr className='text-center  '>
                      <td className='border border-gray-500'>Nama Product</td>
                      <td className='border border-gray-500'>Price</td>
                      <td className='border border-gray-500'>Jml</td>
                      <td className='border border-gray-500'>Total Price</td>

                  </tr>
                </thead>
                <tbody className='border border-gray-500'>
                  {history.products.map((product) => (
                    <tr key={product.productId} className='text-gray-400 text-center lg:text-lg'>
                      <td className='border border-gray-500 py-1'><Link href={`/products/${product.productId}`}>{product.productName}</Link></td>
                      <td className='border border-gray-500 py-1'><CurrencyFormatter amount={product.productPrice} /></td>
                      <td className='border border-gray-500 py-1'>{product.quantity}</td>
                      <td className='border border-gray-500 py-1'><CurrencyFormatter amount={product.quantity * product.productPrice} /></td>
                    </tr>
                  ))}
                </tbody>
             </table>
            <p className='capitalize absolute right-0 text-sm lg:text-lg'>total price : <CurrencyFormatter amount={history.totalPrice} /></p>
             
            </div>

          ))}
          </div>
        :
        <h1>Tidak ada transaksi</h1>
        }
    </div>
  )
}

export default HistoryShoppingPage