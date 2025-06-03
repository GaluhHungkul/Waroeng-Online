"use client";

import Image from "next/image";
import useCart from "../../zustand/useCart";
import CurrencyFormatter from "@/components/CurrencyFormatter";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {

  const { cart, deleteFromCart, addToCart } = useCart();

  const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);

  const router = useRouter()

  const totalPrice: number = cart.reduce((a, b) => a + b.totalPrice, 0);

  const handleCheckout = async () => {
    const loadingToast = toast.loading("Checkout..")
    try {
      setLoadingCheckout(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, totalPrice, })
      });
      if (!response.ok) throw new Error("Terjadi kesalahan ketika checkout");
      localStorage.removeItem("cart-storage");
      toast.success("Transaksi berhasil")
      router.refresh()
      setLoadingCheckout(false);
    } catch (error) {
      setLoadingCheckout(false);
      toast.error("Terjadi kesalahan ketika melakukan checkout")
      console.log(error);
    }
    toast.dismiss(loadingToast)
  };

  return (
    <div className="h-max rounded min-h-96  my-10 bg-gradient-to-br from-gray-z900 to-gray-900 via-gray-800 w-[90vw] mx-auto relative overflow-hidden">
      {cart.length ? (
        <div className="flex flex-col lg:grid lg:grid-cols-2 relative lg:pb-32">
          {cart.map((product) => (
            <div key={product._id} className="flex gap-2 m-2 lg:gap-5">
              <Image
                src={product.img}
                alt={product.name}
                className="size-24 lg:size-64"
                width={150}
                height={150}
              />
              <div className="text-[12px] lg:text-xl relative flex flex-col lg:gap-4">
                <h1>{product.name}</h1>
                <p>Price : <CurrencyFormatter amount={product.price} /></p>
                <p>Quantity : {product.qty}</p>
                <p>Total Price :{" "}<CurrencyFormatter amount={product.price * product.qty} /></p>
                <div className="flex gap-1 lg:absolute bottom-0">
                  <button onClick={() => deleteFromCart(product)} className="bg-white border-2 border-black text-black px-2 lg:px-5 lg:py-1 rounded  font-bold hover:bg-black/10 active:bg-black/20" >
                    -
                  </button>
                  <button onClick={() => addToCart(product)} className="bg-white border-2 border-black text-black px-2 lg:px-5 lg:py-1 rounded  font-bold hover:bg-black/10 active:bg-black/20">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full  p-2 text-sm  border-t border-black lg:absolute lg:bottom-0 lg:text-xl">
            <h1 className="font-semibold">Total Price : <CurrencyFormatter amount={totalPrice} /></h1>
            <button disabled={loadingCheckout} onClick={handleCheckout} className="bg-black text-white mt-2  w-full font-bold rounded  hover:bg-black/70 active:bg-black/50  disabled:bg-black/50 lg:py-2" >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="font-bold text-xl mx-auto  text-center content-center h-96 lg:text-3xl">
          Your Cart is Empty 🤦‍♂️
        </h1>
      )}
    </div>
  );
};

export default CartPage;
