"use client"

import useCart from "@/zustand/useCart"
import DetailCheckout from "./DetailCheckout"
import ListItemInCart from "./ListItemInCart"
import EmptyStateCart from "./EmptyStateCart"
import { Trash2 } from "lucide-react"

const ClientCartPage = () => {

  const { cart, clearCart } = useCart()

  return (
    <div className="p-4 md:p-0 min-h-screen mx-auto pb-14 lg:pb-32 lg:mt-5 relative lg:px-0 md:w-4/5 flex flex-col ">
      {!!cart.length 
      ? <>
          <h1 className="text-center font-bold text-xl mb-4 text-primary-orange md:my-8 md:text-2xl">Your cart</h1>
          <button onClick={clearCart} className="absolute right-4 bg-red-100 rounded p-2 top-2">
            <Trash2 className="text-red-500"/>
          </button>
          <div className="flex flex-col md:flex-row md:gap-8 lg:items-start">
            <ListItemInCart />
            <DetailCheckout />
          </div>
        </>
      : <EmptyStateCart />
      }
    </div>
  )
}

export default ClientCartPage