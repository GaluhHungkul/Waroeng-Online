import { Product } from '@/types/product'
import CurrencyFormatter from '../CurrencyFormatter'

const DialogTotalPrice = ({ quantity, product } : { quantity : number, product : Product | null | undefined }) => {
  return (
    <section className="flex justify-between items-center pb-2 md:text-xl">
        <p>Total Price</p> 
        <p>{quantity ?  <CurrencyFormatter amount={quantity * (product?.price ?? 0)}/> : "-"}</p>
    </section>
  )
}

export default DialogTotalPrice