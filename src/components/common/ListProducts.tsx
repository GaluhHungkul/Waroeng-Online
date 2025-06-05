"use client";
import useCart from "@/zustand/useCart";
import Image from "next/image";
import { Products } from "@/types/products";
import Link from "next/link";
import CurrencyFormatter from "../CurrencyFormatter";
import { motion } from "framer-motion";


const ListProducts = ({ products } :{ products: Products[] }) => {
  
  const { addToCart } = useCart();

  const parentVariants = {
    hidden : { opacity : 0 },
    show : {
      opacity : 1,
      transition : { staggerChildren: 0.1 }
    }
  }

  const childVariants = {
    hidden : { opacity : 0, y : -10 },
    show : { opacity : 1, y : 0 }
  }

  return (  
    <motion.div 
    variants={parentVariants} 
    initial="hidden"
    animate="show"
    className={`grid grid-cols-2 mt-2 mb-10 gap-3 lg:grid-cols-4 lg:gap-5 lg:mt-4`}>
      {products?.map((product: Products) => (
        <motion.div
        variants={childVariants}
        key={product._id}
        className=" relative lg:w-full pb-10 lg:pb-10 flex flex-col items-center min-h-80 bg-white border border-gray-300 rounded overflow-hidden  shadow"
        >
          <Image
            src={product?.img}
            alt={product?.name}
            className="w-full"
            width={150}
            height={150}
          />
          <ul className=" py-2  text-black px-4  text-sm w-full ">
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
            className="absolute bottom-2 bg-black lg:py-1 text-white disabled:bg-black/50 hover:bg-black/70 active:bg-black/50 w-4/5 rounded font-bold "
          >
            {product?.stock ? "BUY" : "SOLD OUT"}
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ListProducts;
