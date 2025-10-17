"use client";
import { Product } from "@/types/api_response";
import { motion } from "framer-motion";
import { useMemo } from "react";
import ProductCard from "./ProductCard";


const ListProducts = ({ products, similar=false } :{ products: Product[] | undefined, similar? : boolean }) => {  

  const parentVariants = {
    hidden : { opacity : 0 },
    show : {
      opacity : 1,
      transition : { staggerChildren: 0.1 }
    }
  }

  const productsMapping = useMemo(() => {
    return (  
    <motion.div 
    variants={parentVariants} 
    initial="hidden"
    animate="show"
    className={`grid grid-cols-2 mt-2 mb-10 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-5 lg:mt-4`}>
      {products?.map((product) => <ProductCard similar={similar} product={product} key={product.id}/>)}
    </motion.div>
  );
  },[products])

  return productsMapping
};

export default ListProducts;
