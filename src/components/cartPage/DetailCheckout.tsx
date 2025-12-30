import useCart from "@/zustand/useCart"
import CurrencyFormatter from "../CurrencyFormatter"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react"

const DetailCheckout = () => {

  const { cart } = useCart()
  const [loadingCheckout, setLoadingCheckout] = useState(false)

  const totalPrice = Number(cart.map(item => item.price * item.qty).reduce((a,b) => a + b, 0).toFixed())

  const handleCheckout = async () => {
    const loadingToast = toast.loading("Checkout...")
    try {
      setLoadingCheckout(true)
      const products = cart.map(({ id, title, price, qty, thumbnail }) => ({
        id, title, qty, 
        price : Number(price.toFixed()), 
        img : thumbnail
      }))
      const res = await fetch("/api/tokenizer", {
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
      const { snapToken } = await res.json()
      window.snap.pay(snapToken, {
        onSuccess: (res) => {
          toast.success("Checkout berhasil")
          console.log(res)
        },
        onError: (res) => {
          toast.error("Checkout gagal")
          console.log(res)
        },
        onClose: () => {
          toast.success("Checkout selesai")
          console.log(res)
        },
      })
    } catch (error) {
      console.log("Error : " , error)
      toast.error("Checkout gagal")
    } finally {
      setLoadingCheckout(false)
      toast.dismiss(loadingToast)
    }
  }
  
  return (
    <div className='border-t border-primary-orange pt-10 flex-1 flex flex-col gap-4'>
      <section className="flex justify-between">
        <p className="font-medium">Total items</p>
        <p className="font-bold">{cart.length} items</p>
      </section>
      <section className="flex justify-between">
        <p className="font-medium">Total price</p>
        <p className="font-bold"><CurrencyFormatter amount={totalPrice} /></p>
      </section>
      <section className="flex gap-4 mt-20">
        <Button variant={"outline"} disabled={loadingCheckout || cart.length === 0} className="relative flex-1 text-lg font-bold text-primary-orange hover:bg-primary-orange/20 active:bg-primary-orange/40 hover:text-primary-orange">
          <span>Bayar Nanti</span>
        </Button>
        <Button onClick={handleCheckout} disabled={loadingCheckout || cart.length === 0} className="bg-primary-orange relative flex-1  text-lg font-bold hover:bg-primary-orange/80 active:bg-primary-orange/50">
          <span>Bayar Sekarang</span>
        </Button>
      </section>
    </div>
  )
}

export default DetailCheckout