import { FC } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'

type Props = {
    qty : number;
    setQty : (val:number) => void
}

const DialogControlQty : FC<Props> = ({ qty, setQty }) => {
  return (
    <section className="py-4 text-xl flex justify-center gap-4 items-center md:py-10 md:text-3xl">
        <Button onClick={() => setQty(qty - 1)} disabled={qty < 1}><Minus /></Button>
        <span>{qty}</span>
        <Button onClick={() => setQty(qty + 1)}><Plus /></Button>
    </section>
  )
}

export default DialogControlQty