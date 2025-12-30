import useCart from "@/zustand/useCart"
import CurrencyFormatter from "../CurrencyFormatter"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react"
import useUser from "@/zustand/useUser"

const DetailCheckout = () => {

  const { cart } = useCart()
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const { user } = useUser()

  const totalPrice = Number(cart.map(item => item.priceAfterDiscount * item.qty).reduce((a,b) => a + b, 0).toFixed())

  const handleCheckoutUsingSnap = async () => {
    const loadingToast = toast.loading("Checkout...")
    try {
      setLoadingCheckout(true)
      const products = cart.map(({ id, title, price, qty, thumbnail }) => ({
        id, title, qty, 
        price : Number(price.toFixed()), 
        img : thumbnail
      }))
      const res = await fetch("/api/midtrans/snap", {
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
  
  const generatePaymentLink = async () => {
    if(!user || !user.id) return

    try {
      const orderedProducts = cart.map((p) => ({
        productId: p.id,
        name: p.title, 
        price: p.priceAfterDiscount, 
        img: p.thumbnail,
        quantity: p.qty,
      }))

      const dataBody = {
        orderedProducts, 
        totalPrice
      }
      console.log(totalPrice)
      const amount = orderedProducts.map(p => {
          console.log(p.price)
          return p.price * p.quantity
      }).reduce((a,b) => {
          console.log(b)
          return a + b 
      }, 0)
      console.log(amount)
      const res = await fetch(`/api/midtrans/payment-link`, {
        method : "POST",
        body : JSON.stringify(dataBody)
      })

      if(!res.ok) {
        const err = await res.json()
        throw new Error(err.error_messages)
      }
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log("Error : " , error)
    }

  }

  return (
    <div className='border-t border-primary-orange pt-10 flex-1 flex flex-col md:border-none md:pt-0 lg:h-[60vh] lg:justify-between'>
      <div>
        <section className="flex justify-between lg:mb-2">
          <p className="font-semibold">Total item</p>
          <p className="font-bold">{cart.length} items</p>
        </section>
        <section className="flex justify-between">
          <p className="font-semibold">Total harga</p>
          <p className="font-bold"><CurrencyFormatter amount={totalPrice} /></p>
        </section>
      </div>
      <section className="flex gap-4 mt-20 md:mt-10 lg:flex-col lg:w-64">
        <Button onClick={generatePaymentLink} variant={"outline"} disabled={loadingCheckout || cart.length === 0} className="relative flex-1 text-lg font-bold text-primary-orange hover:bg-primary-orange/20 active:bg-primary-orange/40 hover:text-primary-orange">
          <span>Bayar Nanti</span>
        </Button>
        <Button onClick={handleCheckoutUsingSnap} disabled={loadingCheckout || cart.length === 0} className="bg-primary-orange relative flex-1  text-lg font-bold hover:bg-primary-orange/80 active:bg-primary-orange/50">
          <span>Bayar Sekarang</span>
        </Button>
      </section>
    </div>
  )
}

export default DetailCheckout