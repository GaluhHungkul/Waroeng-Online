"use client";
import useCart from "@/zustand/useCart";
import Image from "next/image";
import { Products } from "@/types/products";
import Link from "next/link";
import CurrencyFormatter from "../CurrencyFormatter";

const ListProducts = (props: { products: Products[] }) => {
  
  const { addToCart } = useCart();

  return (
    <div className="z-10 backdrop-blur-md lg:ml-10 lg:flex-1">     
      <div className="grid grid-cols-2  mb-10 lg:grid-cols-4 lg:gap-5 ">
        {props?.products?.map((product: Products) => (
          <div
          key={product._id}
          className=" relative lg:w-full pb-10 lg:pb-10 flex flex-col items-center min-h-80 bg-primary rounded overflow-hidden  shadow"
          >
            <Image
              src={product?.img}
              alt={product?.name}
              className="w-full"
              width={150}
              height={150}
            />
            <ul className=" py-2  text-secondary px-4  text-sm w-full ">
              <li className="italic font-semibold mb-2 text-gray-700">{product?.category}</li>
              <Link href={`/products/${product._id}`} className="font-bold mb-1">
                {product?.name}
              </Link>
              <li className="text-gray-500">
                <CurrencyFormatter amount={product.price} />
              </li>
              <li className="text-sm">
                {product?.rate?.value} ⭐ | {product?.rate?.count} reviews
              </li>
              <li className="text-gray-800">Stock : {product?.stock}</li>
            </ul>
            <button
              disabled={!product?.stock}
              onClick={() => addToCart(product)}
              className="absolute bottom-2 disabled:bg-gray-700 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 w-4/5 rounded font-bold "
            >
              {product?.stock ? "BUY" : "SOLD OUT"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
