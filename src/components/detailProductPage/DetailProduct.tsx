import DialogBuyProduct from './DialogBuyProduct'
import { DetailProduct as Product } from '@/types/api_response'
import ThumbnailAndImagesProduct from './ThumbnailAndImagesProduct'
import PriceAndDiscount from './PriceAndDiscount'

const DetailProduct = ({ product } : { product : Product }) => { 

  return (
    <div className='mb-10 relative md:flex lg:mb-40'>
      <ThumbnailAndImagesProduct images={product.images} title={product.title} />
      <section className='py-4 relative space-y-3 font-bold lg:text-xl lg:flex-2 lg:pl-8 lg:pt-0 border-b border-gray-300 text-lg'>
        <h1 className='text-gray-700 text-2xl'>{product?.title}</h1>
        <p>{product?.rating} / 5 ⭐</p>
        <p className='font-normal text-gray-700'>{product?.description}</p>
        <PriceAndDiscount price={product.price} discountPercentage={product.discountPercentage}/>
      </section>
      <section className='py-4 relative space-y-3 font-bold lg:text-xl lg:flex-2 lg:pl-8 lg:pt-0 border-b border-gray-300 text-gray-600'>
        <p className='flex justify-between'>Category <span className='text-gray-400'>{product.category}</span></p>
        <p className='flex justify-between'>Tags <span className='text-gray-400'>{product.tags.join(", ")}</span></p>
      </section>
      <DialogBuyProduct product={product}/>
    </div>
  )
}

export default DetailProduct