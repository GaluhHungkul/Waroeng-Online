import Image from 'next/image'
import CurrencyFormatter from '../CurrencyFormatter'
import { DetailProduct } from '@/types/api_response'

const DialogDetailProduct = ({ product } : { product : DetailProduct | null | undefined }) => {
  return (
    <section className="flex pt-4 gap-4 md:gap-10">
        <div className="relative aspect-[1/1] w-36 rounded overflow-hidden md:w-48 lg:size-60">
            <Image src={product?.thumbnail ?? ""} className="object-center object-cover" alt={product?.title?? ""} fill sizes="30vw"/>
        </div>
        <div className="md:text-xl lg:mt-2">
            <p className='font-semibold text-black'>{product?.category}</p>
            <p className='font-normal text-gray-500 line-clamp-1 mt-4 mb-1'>{product?.title}</p>
            <p className='font-normal text-gray-500'><CurrencyFormatter amount={product?.price || 0}/></p>
        </div>
    </section>
  )
}

export default DialogDetailProduct