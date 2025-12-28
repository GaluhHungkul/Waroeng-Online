import { FC } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button';

type Props = {
    quantity : number;
    setQuantity : (val:number) => void
}

const DialogControlQty : FC<Props> = ({ quantity, setQuantity }) => {
  return (
    <section className="py-4 text-xl flex justify-center gap-4 items-center md:py-10 md:text-3xl">
      <Button className='text-white px-4 py-2 rounded focus:border-none hover:brightness-75 active:brightness-50' onClick={() => setQuantity(quantity - 1)} disabled={quantity < 1}><Minus /></Button>
      <span>{quantity}</span>
      <Button className='text-white px-4 py-2 rounded focus:border-none hover:brightness-75 active:brightness-50' onClick={() => setQuantity(quantity + 1)}><Plus /></Button>
    </section>
  )
}

export default DialogControlQty