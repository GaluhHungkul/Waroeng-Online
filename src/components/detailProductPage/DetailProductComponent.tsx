import DialogSetQuantityToCart from './DialogSetQuantityToCart'
import { DetailProduct } from '@/types/api_response'
import ThumbnailAndImagesProduct from './ThumbnailAndImagesProduct'
import PriceAndDiscount from './PriceAndDiscount'
import Link from 'next/link'
import useCart from '@/zustand/useCart'
import { toast } from 'sonner'
import useUser from '@/zustand/useUser'
import useDialogAuthCard from '@/zustand/useDialogAuthCard'

const DetailProductComponent = ({ product } : { product : DetailProduct }) => { 

  const { addToCart } = useCart()
  const { user } = useUser()
  const { setShowAuthCard } = useDialogAuthCard()

  return (
    <div className='mb-10 relative flex flex-col md:flex-row md:mb-20 md:gap-6 w-full lg:gap-16'>
      <ThumbnailAndImagesProduct images={product.images} title={product.title} />
      <div className='md:flex-1 relative lg:flex-[1.75]'>
        <section className='py-4 relative space-y-3 font-bold lg:text-xl lg:flex-2 lg:pt-0 border-b border-gray-300 md:border-none text-lg md:py-0 lg:mb-20'>
          <h1 className='text-gray-700 text-2xl md:text-4xl'>{product?.title}</h1>
          <p className='md:text-2xl lg:pb-4 '>{product?.rating} / 5 ⭐</p>
          <p className='font-normal text-gray-700 lg:pb-8'>{product?.description}</p>
          <PriceAndDiscount price={product.price} priceAfterDiscount={product.priceAfterDiscount}/>
        </section>
        <section className='py-4 relative space-y-3 font-bold md:text-xl lg:flex-2 lg:pt-0 border-b border-gray-300 md:border-none text-gray-600 lg:space-y-8 '>
          <p className='flex justify-between'>Category <Link href={`/products?category=${product.category}`} className='text-gray-400 hover:underline hover:text-primary-orange'>{product.category}</Link></p>
          <p className='flex justify-between'>Tags <span className='text-gray-400'>{product.tags.join(", ")}</span></p>
        </section>
        <section className='mt-4 w-full font-bold flex gap-3 lg:text-xl'>
          <DialogSetQuantityToCart product={product}/>
          <button onClick={() => {
            if(!user) return setShowAuthCard("signIn");
           addToCart(product) 
           toast.success("Product successfully added to your cart")
          }} className='w-full py-2 bg-primary-orange text-white hover:brightness-90 lg:py-4 focus:outline-none'>Add to cart</button>
        </section>
      </div>
    </div>
  )
}

export default DetailProductComponent