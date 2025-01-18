"use client"

import Image from "next/image";
import useCart from "../zustand/useCart"
import { useState } from "react";
import CurrencyFormatter from "../Components/CurrencyFormatter";

const CartPage = () => {

    const { cart, deleteFromCart, addToCart,  deleteAllcart } = useCart()

    const [loading, setLoading] = useState<boolean>()

    
    const totalPrice:number = cart.reduce((a,b) => a + b.totalPrice, 0)

    const handleCheckout = async () => {
      try {
        
        setLoading(true)

          const response = await fetch('/api/checkout', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            } ,
            body : JSON.stringify({
              cart,
              totalPrice 
            })
          })
          const result = await response.json()
          console.log(result)
          
        setLoading(false)
          deleteAllcart()
        } catch (error) {
          setLoading(false)
          deleteAllcart()
        console.log(error)
      }
    
    }

    

  return (
    <div className="backdrop-blur-sm ">
        <div className="border  h-max rounded min-h-96  my-10 bg-gradient-to-br from-gray-900 to-gray-900 via-gray-800 w-[90vw] mx-auto relative overflow-hidden">
            {cart.length 
            ? 
            <div className="flex flex-col">
              {cart.map((product) => (
                <div key={product._id} className="flex gap-2 m-2 ">
                  {product.img ? <Image src={product.img} alt={product.name} className="size-20"  width={150} height={150}/> : <div className="w-40 h-40 bg-white"></div>}
                  <div className="text-[12px]">
                    <h1>{product.name}</h1>
                    <h1>Price : <CurrencyFormatter amount={product.price}/></h1>
                    <h1>Quantity : {product.qty}</h1>
                    <h1>Total Price : <CurrencyFormatter amount={product.price * product.qty}/></h1>
                    <div className="flex gap-1">
                      <button onClick={() => deleteFromCart(product)} className="bg-gray-600 px-2  rounded  font-bold text-white hover:bg-gray-500 active:bg-gray-400">-</button>
                      <button onClick={() => addToCart(product)} className="bg-gray-600 px-2  rounded  font-bold text-white hover:bg-gray-500 active:bg-gray-400">+</button>
                    </div>
                  </div> 
                </div>
              ))}
              <div className="w-full  p-2 text-sm  border-t">
                <h1>Total Price : <CurrencyFormatter amount={totalPrice} /></h1>
                <button disabled={loading} onClick={handleCheckout} className="bg-white text-black mt-2  w-full font-bold rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-300">Checkout</button>
              </div>
            </div> 
            : 
            <h1 className="font-bold text-xl mx-auto  text-center content-center h-96">Your Cart is Empty 🤦‍♂️</h1>
            }
            
           
        </div>
    </div>
  )
}

export default CartPage