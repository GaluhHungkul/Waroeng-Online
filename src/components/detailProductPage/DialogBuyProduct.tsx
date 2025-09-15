import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "../ui/button"
import { Product } from "@/types/product"
import DialogDetailProduct from "./DialogDetailProduct"
import DialogControlQty from "./DialogControlQty"
import DialogTotalPrice from "./DialogTotalPrice"
import { toast } from "react-toastify"

const DialogBuyProduct = ({ product } : { product : Product | null | undefined}) => {


  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [loadingCheckout, setLoadingCheckout] = useState(false)

  const handleCheckout = async () => {
    if(!quantity) return
    const loadingToast = toast("Checkout...")
    try {
      setLoadingCheckout(true)
      const res = await fetch("/api/products/checkout", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ 
          detailProduct : {
            product, quantity
          }
        })
      })
      if(!res.ok) throw new Error("Failed to checkout")
      console.log(await res.json())
      setQuantity(0)
      toast.update(loadingToast, {
        render : "Checkout berhasil",
        type : "success",
        isLoading : false,
        autoClose : 2000
      })
    } catch (error) {
      console.log("Error : " , error)
      toast.update(loadingToast, {
        render : "Checkout gagal",
        type : "error",
        isLoading : false,
        autoClose : 2000
      })
    } finally {
      setLoadingCheckout(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mt-4 md:absolute md:bottom-0 md:w-full md:text-lg lg:text-xl lg:py-5"><Button>Buy</Button></DialogTrigger>
      <DialogContent className="w-4/5 rounded">
        <DialogHeader>
          <DialogTitle className="text-center">Buy Product</DialogTitle>
        </DialogHeader>
          <div>
            <DialogDetailProduct product={product}/>
            <DialogControlQty quantity={quantity} setQuantity={setQuantity} />
            <DialogTotalPrice quantity={quantity} product={product}/>            
          </div>
          <Button  onClick={handleCheckout} disabled={quantity < 1 || loadingCheckout} className="md:text-lg">Checkout</Button>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBuyProduct

