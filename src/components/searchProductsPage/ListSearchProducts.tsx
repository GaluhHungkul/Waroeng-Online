"use client";
import { motion } from "framer-motion";
import { FC } from "react";
import { useSearchProductsQuery } from "@/api/productApi";
import SkeletonListProducts from "../skeleton/SkeletonListProducts";
import ProductCard from "../common/ProductCard";

type Props = {
  page? : number
  order? : string 
  sortBy? : string
  q : string
}

const ListSearchProducts : FC<Props> = ({ page=1, q="", order="", sortBy="" }) => {  

  const { data, isPending, isError, error } = useSearchProductsQuery({
    page, q, order, sortBy
  })

  if(isPending) return <SkeletonListProducts similar/>
  if(isError) return <p>Error : {error.message}</p>

  const parentVariants = {
    hidden : { opacity : 0 },
    show : {
      opacity : 1,
      transition : { staggerChildren: 0.1 }
    }
  }

  return (  
    <motion.div 
    variants={parentVariants} 
    initial="hidden"
    animate="show"
    className={`grid grid-cols-2 mt-2 mb-10 gap-3  md:grid-cols-3 lg:grid-cols-6 lg:gap-5 lg:mt-4`}>
      {data?.products?.map((product) => <ProductCard product={product} key={product.id}/>)}
    </motion.div>
  )
}

export default ListSearchProducts;
