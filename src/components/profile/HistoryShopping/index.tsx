import CurrencyFormatter from "../../CurrencyFormatter"
import { Order } from "@/types/order"
import FormatedDate from "../FormatedDate"
import Image from "next/image"
import DeskripsiProduct from "./DeskripsiProduct"
import StatusPembelian from "./StatusPembelian"
import Link from "next/link"

const HistoryShopping = ({ historyShopping } : { historyShopping : Order[] }) => {


  return (
    <div className='w-full'>
        {historyShopping?.map(({ orderedProduct : { name, img, price, quantity, productId }, createdAt, totalPrice, paymentMethod, paymentStatus,orderStatus }, index) => (
        <div key={index} className='relative pb-16 mb-10 border-b border-black'>
            <div className="flex justify-between items-center mb-4">
                <h1 className='text-gray-800 text-sm lg:text-base'><FormatedDate date={createdAt}/></h1>
                <Link href={`/products/${productId}`} className="bg-blue-400 text-white px-4 py-1 rounded font-semibold text-sm hover:bg-blue-500">Beli lagi</Link>
            </div>
            <div className="flex justify-between mt-2">
                <section className="relative aspect-[1/1] w-40">
                    <Image src={img} fill alt={name}/>
                </section>
                <DeskripsiProduct name={name} quantity={quantity} price={price}/>
            </div>
            <StatusPembelian paymentMethod={paymentMethod} paymentStatus={paymentStatus} orderStatus={orderStatus}/>
            <p className='capitalize absolute right-0 text-sm lg:text-lg font-semibold bottom-4'>Total harga : <CurrencyFormatter amount={totalPrice} /></p>
        </div>
        ))}
    </div>
  )
}

export default HistoryShopping