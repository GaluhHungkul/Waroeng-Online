"use client";

import Image from "next/image";
import useCart from "../../zustand/useCart";
import { useEffect, useState } from "react";
import CurrencyFormatter from "../Components/CurrencyFormatter";
import useProducts from "../../zustand/useProducts";

const CartPage = () => {
  const { cart, deleteFromCart, addToCart } = useCart();

  const { setProducts } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const result = await response.json();
      setProducts(result);
    };
    fetchProducts();
  }, [setProducts]);

  const [loading, setLoading] = useState<boolean>();

  const totalPrice: number = cart.reduce((a, b) => a + b.totalPrice, 0);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          totalPrice,
        }),
      });
      if (!response.ok) throw new Error("Terjadi kesalahan ketika checkout");
      localStorage.removeItem("cart");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="backdrop-blur-sm ">
      <div className="border  h-max rounded min-h-96  my-10 bg-gradient-to-br from-gray-z900 to-gray-900 via-gray-800 w-[90vw] mx-auto relative overflow-hidden">
        {cart.length ? (
          <div className="flex flex-col lg:grid lg:grid-cols-2 relative lg:pb-32">
            {cart.map((product) => (
              <div key={product._id} className="flex gap-2 m-2 lg:gap-5">
                {product.img ? (
                  <Image
                    src={product.img}
                    alt={product.name}
                    className="size-24 lg:size-64"
                    width={150}
                    height={150}
                  />
                ) : (
                  <div className="w-40 h-40 bg-white"></div>
                )}
                <div className="text-[12px] lg:text-xl relative flex flex-col lg:gap-4">
                  <h1>{product.name}</h1>
                  <h1>
                    Price : <CurrencyFormatter amount={product.price} />
                  </h1>
                  <h1>Quantity : {product.qty}</h1>
                  <h1>
                    Total Price :{" "}
                    <CurrencyFormatter amount={product.price * product.qty} />
                  </h1>
                  <div className="flex gap-1 lg:absolute bottom-0">
                    <button
                      onClick={() => deleteFromCart(product)}
                      className="bg-gray-600 px-2 lg:px-5 lg:py-1 rounded  font-bold text-white hover:bg-gray-500 active:bg-gray-400"
                    >
                      -
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gray-600 px-2 lg:px-5 lg:py-1 rounded  font-bold text-white hover:bg-gray-500 active:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full  p-2 text-sm  border-t lg:absolute lg:bottom-0 lg:text-xl">
              <h1>
                Total Price : <CurrencyFormatter amount={totalPrice} />
              </h1>
              <button
                disabled={loading}
                onClick={handleCheckout}
                className="bg-white text-black mt-2  w-full font-bold rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300  disabled:bg-gray-300 lg:py-2"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <h1 className="font-bold text-xl mx-auto  text-center content-center h-96">
            Your Cart is Empty 🤦‍♂️
          </h1>
        )}
      </div>
    </div>
  );
};

export default CartPage;
