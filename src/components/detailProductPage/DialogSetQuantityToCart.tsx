"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { DetailProduct } from "@/types/api_response"
import DialogDetailProduct from "./DialogDetailProduct"
import DialogControlQty from "./DialogControlQty"
import DialogTotalPrice from "./DialogTotalPrice"
import { toast } from "sonner"
import { Button } from "../ui/button"
import useUser from "@/zustand/useUser"
import useDialogAuthCard from "@/zustand/useDialogAuthCard"
import useCart from "@/zustand/useCart"

const DialogSetQuantityToCart = ({ product } : { product : DetailProduct }) => {


  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  // const [loadingCheckout, setLoadingCheckout] = useState(false)

  const { user } = useUser()
  const { setShowAuthCard } = useDialogAuthCard()
  const { addToCart } = useCart()

  // const handleCheckout = async () => {
  //   if(!quantity) return
  //   const loadingToast = toast.loading("Checkout...")
  //   try {
  //     setLoadingCheckout(true)
  //     const { id, title, price, thumbnail } = product
  //     const res = await fetch("/api/products/checkout", {
  //       method : "POST",
  //       headers : {
  //         "Content-Type" : "application/json"
  //       },
  //       body : JSON.stringify({ 
  //         id, price, 
  //         name : title,
  //         img : thumbnail,
  //         quantity
  //       })
  //     })
  //     if(!res.ok) throw new Error("Failed to checkout")
  //     setQuantity(0)
  //     toast.success("Checkout berhasil")
  //   } catch (error) {
  //     console.log("Error : " , error)
  //     toast.error("Checkout gagal")
  //   } finally {
  //     setLoadingCheckout(false)
  //     toast.dismiss(loadingToast)
  //   }
  // }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <button onClick={() => {
          if(!user) {
            setShowAuthCard("signIn")
          }
        }} className='w-full py-2 bg-gray-200 text-gray-700 cursor-pointer hover:brightness-90 lg:py-4'>Set quantity</button>
      </DialogTrigger>
      <DialogContent className="w-4/5 rounded lg:top-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center text-gray-700 md:text-3xl">Add to your cart</DialogTitle>
        </DialogHeader>
          <div>
            <DialogDetailProduct product={product}/>
            <DialogControlQty quantity={quantity} setQuantity={setQuantity} />
            <DialogTotalPrice quantity={quantity} price={product?.price ?? 99999}/>            
          </div>
          <Button onClick={() => {
            addToCart(product)
            toast.success(`Successfully addded ${quantity} these product to your cart`)
          }} disabled={quantity < 1} className="md:text-lg text-white rounded font-bold  ">Add</Button>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSetQuantityToCart

