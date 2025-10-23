import Image from 'next/image'
import CurrencyFormatter from '../CurrencyFormatter'
import { DetailProduct } from '@/types/api_response'

const DialogDetailProduct = ({ product } : { product : DetailProduct | null | undefined }) => {
  return (
    <section className="flex flex-col items-center pt-4 gap-4 md:gap-10 lg:flex-row">
      <div className="relative aspect-[1/1] w-36 rounded overflow-hidden md:w-48 lg:size-60">
          <Image src={product?.thumbnail ?? ""} className="object-center object-cover" alt={product?.title?? ""} fill sizes="30vw"/>
      </div>
      <div className="md:text-xl lg:mt-2 text-gray-700 font-semibold">
          <p className='line-clamp-1 mt-4 mb-1 md:text-2xl' title={product?.title}>{product?.title}</p>
          <p className='text-center my-4 text-2xl md:text-4xl'><CurrencyFormatter amount={product?.priceAfterDiscount || 0}/></p>
      </div>
    </section>
  )
}

export default DialogDetailProduct