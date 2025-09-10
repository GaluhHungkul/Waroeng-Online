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
import Image from "next/image"
import CurrencyFormatter from "../CurrencyFormatter"

const DialogBuyProduct = ({ product } : { product : Product | null | undefined}) => {

  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(0)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mt-4"><Button>Buy</Button></DialogTrigger>
      <DialogContent className="w-4/5 rounded">
        <DialogHeader>
          <DialogTitle>Buy Product</DialogTitle>
          <section className="flex pt-4 gap-4">
            <div className="relative size-36 rounded overflow-hidden">
                <Image src={product?.img ?? ""} className="object-center object-cover" alt={product?.name?? ""} fill sizes="30vw"/>
            </div>
            <div>
                <p className='font-semibold text-black'>{product?.category}</p>
                <p className='font-normal text-gray-500 line-clamp-1 mt-4 mb-1'>{product?.name}</p>
                <p className='font-normal text-gray-500'><CurrencyFormatter amount={product?.price || 0}/></p>
            </div>
          </section>
          <section className="space-x-4 py-4 text-xl">
            <Button onClick={() => setQty(p => p - 1)} disabled={qty < 1}>-</Button>
            <span>{qty}</span>
            <Button onClick={() => setQty(p => p + 1)}>+</Button>
          </section>
          {!!qty && 
            <div className="flex justify-between items-center pb-2">
                <p>Total Price</p> 
                <p><CurrencyFormatter amount={qty * (product?.price ?? 0)}/></p>
            </div>
            }
          <Button disabled={qty < 1}>Checkout</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBuyProduct

