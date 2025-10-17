"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Product } from "@/types/api_response"
import DetailProductCard from "./DetailProductCard"
import ImageProductCard from "./ImageProductCard"


const ProductCard = ({ product, similar=false } : { product : Product, similar? : boolean }) => {


  return (
    <motion.section
    className="relative lg:w-full flex flex-col items-center min-h-80 bg-white rounded overflow-hidden  shadow"
    >
      <Link href={`/products/${product.id}`} className="size-full">
        <ImageProductCard thumbnail={product.thumbnail} title={product.title}/>
        <DetailProductCard product={product} similar={similar}/>
      </Link>
    </motion.section>
  )
}

export default ProductCard