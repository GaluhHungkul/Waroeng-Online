import CurrencyFormatter from '@/components/CurrencyFormatter'
import { FC } from 'react';

type Props = {
    name : string;
    price : number;
    quantity : number
}

const DeskripsiProduct : FC<Props> = ({ name, price, quantity }) => {
  return (
    <section className="text-sm space-y-2 md:text-2xl font-bold text-gray-700 w-1/2 ">
      <p>{name} x {quantity}</p>
      <p><CurrencyFormatter amount={price} /> x {quantity}</p>
    </section>
  )
}

export default DeskripsiProduct