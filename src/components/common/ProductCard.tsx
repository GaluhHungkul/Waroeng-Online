"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import CurrencyFormatter from "../CurrencyFormatter"
import { Product } from "@/types/api_response"


const ProductCard = ({ product, similar=false } : { product : Product, similar? : boolean }) => {

    const childVariants = {
    hidden : { opacity : 0, y : -10 },
    show : { opacity : 1, y : 0 }
  }

  return (
    <motion.section
        variants={childVariants}
        className="relative lg:w-full flex flex-col items-center min-h-80 bg-white border border-gray-300 rounded overflow-hidden  shadow"
        >
          <div className="relative aspect-[1/1] w-full">
            <Image
              src={product?.thumbnail}
              alt={product?.title}
              fill
              sizes="50vw"
              className="object-center object-cover"
              />
          </div>
          <ul className=" py-2  text-black px-4  text-sm w-full ">
            {!similar && <li className="italic font-semibold mb-2 text-gray-700">{product?.category}</li>}
            <Link href={`/products/${product.id}`} className="font-bold mb-1">
              {product?.title}
            </Link>
            <li className="text-gray-500">
            <CurrencyFormatter amount={product.price} />
            </li>
            <li className="text-sm">
              {product?.rating} / 5 ⭐
            </li>
            <li className="text-gray-800">Stock : {product?.stock}</li>
          </ul>
        </motion.section>
  )
}

export default ProductCard