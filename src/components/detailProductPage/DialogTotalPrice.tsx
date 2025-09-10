import { Product } from '@/types/product'
import CurrencyFormatter from '../CurrencyFormatter'

const DialogTotalPrice = ({ qty, product } : { qty : number, product : Product | null | undefined }) => {
  return (
    <section className="flex justify-between items-center pb-2 md:text-xl">
        <p>Total Price</p> 
        <p>{qty ?  <CurrencyFormatter amount={qty * (product?.price ?? 0)}/> : "-"}</p>
    </section>
  )
}

export default DialogTotalPrice