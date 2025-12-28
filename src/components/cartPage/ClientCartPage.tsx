"use client"

import useCart from "@/zustand/useCart"
import DetailCheckout from "./DetailCheckout"
import ListItemInCart from "./ListItemInCart"
import EmptyStateCart from "./EmptyStateCart"
import { Trash2 } from "lucide-react"

const ClientCartPage = () => {

  const { cart, clearCart } = useCart()

  return (
    <div className="p-4 md:p-8 min-h-screen mx-auto pb-14 lg:pb-32 lg:mt-5 relative lg:px-0 lg:w-4/5 flex flex-col">
        {!!cart.length 
        ? <>
            <h1 className="text-center font-bold text-xl mb-4 text-primary-orange">Your cart</h1>
            <button onClick={clearCart} className="absolute right-4 bg-red-100 rounded p-2 top-2">
              <Trash2 className="text-red-500"/>
            </button>
            <ListItemInCart />
            <DetailCheckout />
          </>
        : <EmptyStateCart />
      }
    </div>
  )
}

export default ClientCartPage