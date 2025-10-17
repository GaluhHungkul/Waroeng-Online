"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Product } from "@/types/api_response"
import DetailProductCard from "./DetailProductCard"
import ImageProductCard from "./ImageProductCard"


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
      <Link href={`/products/${product.id}`} className="size-full">
        <ImageProductCard thumbnail={product.thumbnail} title={product.title}/>
        <DetailProductCard product={product} similar={similar}/>
      </Link>
    </motion.section>
  )
}

export default ProductCard