import useCart from "@/zustand/useCart"
import CurrencyFormatter from "../CurrencyFormatter"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react"
import useUser from "@/zustand/useUser"

const DetailCheckout = () => {

  const { cart, clearCart } = useCart()
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const { user } = useUser()

  const totalPrice = Number(cart.map(item => item.priceAfterDiscount * item.qty).reduce((a,b) => a + b, 0).toFixed())

  const handleCheckoutUsingSnap = async () => {
    const loadingToast = toast.loading("Checkout...")
    try {
      setLoadingCheckout(true)
      const products = cart.map(({ id, title, qty, thumbnail, priceAfterDiscount }) => ({
        id, title, qty, 
        price : Number(priceAfterDiscount.toFixed()), 
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
        onSuccess: () => {
          toast.success("Checkout berhasil");
          clearCart()
        },
        onError: () => {
          toast.error("Checkout gagal")
        },
        onClose: () => {
          toast.success("Checkout selesai")
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
    const loadingToast = toast.loading("Generate payment link...")
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
      const res = await fetch(`/api/midtrans/payment-link`, {
        method : "POST",
        body : JSON.stringify(dataBody)
      })

      if(!res.ok) {
        const err = await res.json()
        throw new Error(err.error_messages)
      }
      toast.success("Link pembayaran berhasil dibuat di riwayat belanja anda")
      clearCart()
    } catch (error) {
      console.log("Error : " , error)
    } finally {
      toast.dismiss(loadingToast)
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
      <section className="flex gap-4 mt-20 md:mt-10 lg:flex-col">
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