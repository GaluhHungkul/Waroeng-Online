import CurrencyFormatter from '@/components/CurrencyFormatter'
import { FC } from 'react';

type Props = {
    name : string;
    price : number;
    quantity : number
}

const DeskripsiProduct : FC<Props> = ({ name, price, quantity }) => {
  return (
    <section className="text-end text-sm space-y-2">
        <p>{name}</p>
        <p>Harga satuan : <CurrencyFormatter amount={price}/></p>
        <p>Jumlah pembelian : {quantity}</p>
    </section>
  )
}

export default DeskripsiProduct