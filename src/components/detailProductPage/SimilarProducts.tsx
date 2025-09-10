import { Product } from '@/types/product'
import ListProducts from '../common/ListProducts'

const SimilarProducts = ({ products } : { products : Product[] | undefined }) => {
  return (
    <>
      <h1 className='text-center font-bold text-xl mb-4'>Similar Products</h1>
      <ListProducts products={products} similar/>
    </>
  )
}

export default SimilarProducts