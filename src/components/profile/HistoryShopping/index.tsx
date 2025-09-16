import CurrencyFormatter from "../../CurrencyFormatter"
import { Order } from "@/types/order"
import FormatedDate from "../FormatedDate"
import Image from "next/image"
import DeskripsiProduct from "./DeskripsiProduct"
import StatusPembelian from "./StatusPembelian"
import Link from "next/link"
import { Clock, ShoppingCart } from "lucide-react"

const HistoryShopping = ({ historyShopping } : { historyShopping : Order[] }) => {


  return (
    <div className='w-full md:w-[90%] md:mx-auto'>
        {historyShopping?.map(({ orderedProduct : { name, img, price, quantity, productId }, createdAt, totalPrice, paymentMethod, paymentStatus,orderStatus }, index) => (
        <div key={index} className='relative pb-16 mb-10 border-b border-black md:border-b-4 md:pb-20'>
            <div className="flex justify-between items-center mb-4 text-sm md:text-base md:mb-6 lg:text-lg">
                <h1 className='text-gray-400 flex items-center gap-2'><Clock /><FormatedDate date={createdAt}/></h1>
                <Link href={`/products/${productId}`} className="bg-blue-400 text-white px-4 py-1 rounded font-semibold flex items-center gap-2 hover:bg-blue-500 md:px-8 md:py-1.5 lg:gap-4"><ShoppingCart />Beli lagi</Link>
            </div>
            <div className="flex justify-between">
                <section className="relative aspect-[1/1] w-40 md:w-72 lg:w-96">
                    <Image src={img} fill alt={name}/>
                </section>
                <DeskripsiProduct name={name} quantity={quantity} price={price}/>
            </div>
            <StatusPembelian paymentMethod={paymentMethod} paymentStatus={paymentStatus} orderStatus={orderStatus}/>
            <p className='capitalize absolute right-0 text-sm md:text-lg font-semibold bottom-4'>Total harga : <CurrencyFormatter amount={totalPrice} /></p>
        </div>
        ))}
    </div>
  )
}

export default HistoryShopping