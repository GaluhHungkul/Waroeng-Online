import ListProducts from '../common/ListProducts'

const SimilarProducts = ({ productId } : {  productId : string }) => {
  return (
    <div>
      <h1 className='text-center font-bold mb-10 relative before:absolute text-gray-700  before:-bottom-2 before:w-1/3 before:right-1/2 before:h-1 before:bg-primary-orange before:translate-x-1/2 before:rounded-full text-2xl md:before md:text-4xl md:mb-20 md:before:-bottom-4 lg:before:w-1/5'>Similar <span className='text-primary-orange'>Products</span></h1>
      <ListProducts queryKey={`similar_product_id_${productId}`} similar/>
    </div>
  )
}

export default SimilarProducts