import Link from "next/link"
import CurrencyFormatter from "../CurrencyFormatter"
import { Order } from "@/types/order"
import FormatedDate from "./FormatedDate"

const HistoryShopping = ({ historyShopping } : { historyShopping : Order[] }) => {


  return (
    <div className='w-full'>
        {historyShopping?.map((data, index) => (
        <div key={index} className='relative pb-10 mb-10 border-b border-black'>
            <h1 className='text-gray-800 text-sm lg:text-base'><FormatedDate date={data.createdAt}/></h1>
            <table className='text-[12px] bg-white w-full lg:text-lg gap-4 my-5 px-4 py-2'>
            <thead className='border border-gray-800'>
                <tr className='text-center text-black font-semibold'>
                    <td className='border border-gray-800'>Nama Product</td>
                    <td className='border border-gray-800'>Price</td>
                    <td className='border border-gray-800'>Jml</td>
                    <td className='border border-gray-800'>Total Price</td>
                </tr>
            </thead>
            <tbody className='border border-gray-800'>
                {data.products.map((product) => (
                <tr key={product.product} className='text-gray-800 text-center lg:text-lg'>
                    <td className='border border-gray-800 py-1'><Link href={`/products/${product._id}`}>{product.name}</Link></td>
                    <td className='border border-gray-800 py-1'><CurrencyFormatter amount={product.price} /></td>
                    <td className='border border-gray-800 py-1'>{product.quantity}</td>
                    <td className='border border-gray-800 py-1'><CurrencyFormatter amount={data.totalPrice} /></td>
                </tr>
                ))}
            </tbody>
            </table>
        <p className='capitalize absolute right-0 text-sm lg:text-lg font-semibold'>total price : <CurrencyFormatter amount={data.totalPrice} /></p>
        </div>
        ))}
    </div>
  )
}

export default HistoryShopping