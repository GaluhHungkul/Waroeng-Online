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

const DialogBuyProduct = ({ product } : { product : Product | null | undefined}) => {

  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(0)

  const handleCheckout = async () => {
    if(!qty) return
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
            <DialogControlQty qty={qty} setQty={setQty}/>
            <DialogTotalPrice qty={qty} product={product}/>            
          </div>
          <Button onClick={handleCheckout} disabled={qty < 1} className="md:text-lg">Checkout</Button>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBuyProduct

