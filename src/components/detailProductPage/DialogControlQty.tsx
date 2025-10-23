import { FC } from 'react'
import { Minus, Plus } from 'lucide-react'

type Props = {
    quantity : number;
    setQuantity : (val:number) => void
}

const DialogControlQty : FC<Props> = ({ quantity, setQuantity }) => {
  return (
    <section className="py-4 text-xl flex justify-center gap-4 items-center md:py-10 md:text-3xl">
      <button className='bg-primary-orange disabled:bg-primary-orange/50 text-white px-4 py-2 rounded focus:border-none hover:brightness-75 active:brightness-50' onClick={() => setQuantity(quantity - 1)} disabled={quantity < 1}><Minus /></button>
      <span>{quantity}</span>
      <button className='bg-primary-orange disabled:bg-primary-orange/50 text-white px-4 py-2 rounded focus:border-none hover:brightness-75 active:brightness-50' onClick={() => setQuantity(quantity + 1)}><Plus /></button>
    </section>
  )
}

export default DialogControlQty