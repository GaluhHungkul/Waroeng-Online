import { Product } from '@/types/product'
import ListProducts from '../common/ListProducts'

const SimilarProducts = ({ products } : { products : Product[] | undefined }) => {
  return (
    <ListProducts products={products} similar/>
  )
}

export default SimilarProducts