"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import { DetailProduct } from "@/types/api_response"
import DialogDetailProduct from "./DialogDetailProduct"
import DialogControlQty from "./DialogControlQty"
import DialogTotalPrice from "./DialogTotalPrice"
import { toast } from "sonner"

const DialogBuyProduct = ({ product } : { product : DetailProduct | null | undefined}) => {


  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [loadingCheckout, setLoadingCheckout] = useState(false)

  const handleCheckout = async () => {
    if(!quantity) return
    const loadingToast = toast.loading("Checkout...")
    try {
      setLoadingCheckout(true)
      const res = await fetch("/api/products/checkout", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ 
          product, quantity
        })
      })
      if(!res.ok) throw new Error("Failed to checkout")
      console.log(await res.json())
      setQuantity(0)
      toast.success("Checkout berhasil")
    } catch (error) {
      console.log("Error : " , error)
      toast.error("Checkout gagal")
    } finally {
      setLoadingCheckout(false)
      toast.dismiss(loadingToast)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <button className='w-full py-2 bg-primary-orange text-white hover:brightness-90 lg:py-4'>Buy</button>
      </DialogTrigger>
      <DialogContent className="w-4/5 rounded">
        <DialogHeader>
          <DialogTitle className="text-center">Buy Product</DialogTitle>
        </DialogHeader>
          <div>
            <DialogDetailProduct product={product}/>
            <DialogControlQty quantity={quantity} setQuantity={setQuantity} />
            <DialogTotalPrice quantity={quantity} price={product?.price ?? 99999}/>            
          </div>
          <Button  onClick={handleCheckout} disabled={quantity < 1 || loadingCheckout} className="md:text-lg">Checkout</Button>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBuyProduct

