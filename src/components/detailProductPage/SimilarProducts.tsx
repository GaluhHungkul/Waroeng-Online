import { Product } from '@/types/api_response'
import { motion } from 'framer-motion'
import { FC } from 'react'
import ProductCard from '../common/ProductCard'

type Props = {
  data : Product[]
}

const SimilarProducts : FC<Props> = ({ data }) => {

  const parentVariants = {
    hidden : { opacity : 0 },
    show : {
      opacity : 1,
      transition : { staggerChildren: 0.1 }
    }
  }

  return (
    <div>
      <h1 className='text-center font-bold mb-10 relative before:absolute text-gray-700  before:-bottom-2 before:w-1/3 before:right-1/2 before:h-1 before:bg-primary-orange before:translate-x-1/2 before:rounded-full text-2xl md:before md:text-4xl md:mb-20 md:before:-bottom-4 lg:before:w-1/5'>Similar <span className='text-primary-orange'>Products</span></h1>
      <motion.div 
      variants={parentVariants} 
      initial="hidden"
      animate="show"
      className={`grid grid-cols-2 mt-2 mb-10 gap-3  md:grid-cols-3 lg:grid-cols-6 lg:gap-5 lg:mt-4`}>
        {data?.map((product) => <ProductCard similar product={product} key={product.id}/>)}
      </motion.div>
    </div>
  )
}

export default SimilarProducts