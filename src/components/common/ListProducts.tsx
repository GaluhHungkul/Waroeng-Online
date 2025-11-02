"use client";
import { motion } from "framer-motion";
import { FC } from "react";
import ProductCard from "./ProductCard";
import { useProductsQuery } from "@/api/productApi";
import SkeletonListProducts from "../skeleton/SkeletonListProducts";
import { Button } from "../ui/button";

type Props = {
  similar? : boolean  
  page? : number
  category? : string  
  queries? : string  
  queryKey? : string  
  order? : string 
  sortBy? : string
  dashboard? : boolean
}

const ListProducts : FC<Props> = ({ similar=false, page=1, category="", queries="", queryKey="", order="", sortBy="", dashboard=false }) => {  

  const { data, isPending, isError, error } = useProductsQuery({
    page, category, queries, queryKey, order, sortBy
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
    <>
      <motion.div 
      variants={parentVariants} 
      initial="hidden"
      animate="show"
      className={`grid grid-cols-2 mt-2 mb-10 gap-3  md:grid-cols-3 lg:grid-cols-6 lg:gap-5 lg:mt-4`}>
        {data?.products?.map((product) => <ProductCard similar={similar} product={product} key={product.id}/>)}
      </motion.div>
      {dashboard && <Button className="absolute right-1/2 translate-x-1/2  py-1 rounded-full" variant={"outline"}>Show more</Button>}
    </>
  )
}

export default ListProducts;
