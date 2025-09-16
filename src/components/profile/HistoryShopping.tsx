import Link from "next/link"
import CurrencyFormatter from "../CurrencyFormatter"
import { Order } from "@/types/order"
import FormatedDate from "./FormatedDate"
import Image from "next/image"

const HistoryShopping = ({ historyShopping } : { historyShopping : Order[] }) => {


  return (
    <div className='w-full'>
        {historyShopping?.map((data, index) => (
        <div key={index} className='relative pb-10 mb-10 border-b border-black'>
            <h1 className='text-gray-800 text-sm lg:text-base'><FormatedDate date={data.createdAt}/></h1>
            <div className="flex">
                <section className="relative aspect-[1/1] w-40">
                    {/* <Image src={data.orderedProduct.product}/> */}
                </section>
            </div>
        <p className='capitalize absolute right-0 text-sm lg:text-lg font-semibold'>total price : <CurrencyFormatter amount={data.totalPrice} /></p>
        </div>
        ))}
    </div>
  )
}

export default HistoryShopping