import useCart from "@/zustand/useCart"
import CurrencyFormatter from "../CurrencyFormatter"
import { Button } from "../ui/button"
import { ChevronsRight } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

const DetailCheckout = () => {

  const { cart } = useCart()
  const [loadingCheckout, setLoadingCheckout] = useState(false)

  const totalPrice = cart.map(item => item.price * item.qty).reduce((a,b) => a + b, 0)

  const handleCheckout = async () => {
    const loadingToast = toast.loading("Checkout...")
    try {
      setLoadingCheckout(true)
      const products = cart.map(({ id, title, price, qty }) => ({
        id, title, price, qty
      }))
      const res = await fetch("/api/products/checkout", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ 
          products, 
          totalPrice,
        })
      })
      if(!res.ok) throw new Error("Failed to checkout")
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
    <div className='border-y border-primary-orange pt-10 flex-1 flex flex-col gap-4'>
      <section className="flex justify-between">
        <p className="font-medium">Total items</p>
        <p className="font-bold">{cart.length} items</p>
      </section>
      <section className="flex justify-between">
        <p className="font-medium">Total price</p>
        <p className="font-bold"><CurrencyFormatter amount={totalPrice} /></p>
      </section>
      <Button onClick={handleCheckout} disabled={loadingCheckout || cart.length === 0} className="bg-primary-orange relative mt-20 text-lg font-bold hover:bg-primary-orange/80 active:bg-primary-orange/50">
        <ChevronsRight strokeWidth={4} className="scale-150 bg-white text-primary-orange absolute left-4 rounded"/> 
        <span>Checkout</span>
      </Button>
    </div>
  )
}

export default DetailCheckout