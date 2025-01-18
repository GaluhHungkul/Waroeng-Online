"use client"
import useCart from "@/app/zustand/useCart";
import Image from "next/image";
import { Products } from "@/types/products";
import Link from "next/link";





const ListProducts = (props : {products : Products[]}) => {

const { addToCart } = useCart()

const CurrencyFormatter = (value : { amount : number }) => {
  const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value.amount);

  return <span>{formatCurrency}</span>;
};

  return (
    <div className="relative z-10 flex-1 overflow-auto">
        <ul className="grid grid-cols-2 gap-5  justify-items-center mx-auto mt-10 w-4/5 lg:grid-cols-4">
          {props.products.map((product: Products) => (
            <div key={product._id} className="my-5 relative lg:w-52 lg:pb-4 flex flex-col items-center  bg-gray-800">
              <Image src={product.img} alt={product.name} className="w-full"  width={150} height={150}/>
              <ul className="flex flex-col gap-2 pb-4 mt-3 py-2  px-5 text-sm lg:w-full ">
                <li className="text-gray-400">{product?.category}</li>
                <Link href={`/products/${product._id}`} className="font-bold ">{product?.name}</Link>
                <CurrencyFormatter amount={product.price} />
                <li className="truncate w-28 ">{product?.description}</li>
                <li>{product?.rate.value} ⭐ | {product.rate.count} reviews</li>
              </ul> 
              <button onClick={() => addToCart(product)} className="absolute -bottom-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 w-4/5 rounded font-bold ">BUY</button>
            </div>
          ))}
        </ul>        
    </div>
  )
}

export default ListProducts