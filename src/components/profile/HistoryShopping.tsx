import Link from "next/link"
import CurrencyFormatter from "../CurrencyFormatter"
import { TypeHistoryShopping } from "@/types/history_shopping"

const HistoryShopping = ({ historyShopping } : { historyShopping : TypeHistoryShopping }) => {


  return (
    <div className='w-full'>
        {historyShopping?.map((data, index) => (
        <div key={index} className='relative pb-10 mb-10 border-b border-black'>
            <h1 className='text-gray-800 text-sm lg:text-base'>Transaksi pada {new Date(data.purchasedAt).toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}
            </h1>
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
                <tr key={product.productId} className='text-gray-800 text-center lg:text-lg'>
                    <td className='border border-gray-800 py-1'><Link href={`/products/${product.productId}`}>{product.productName}</Link></td>
                    <td className='border border-gray-800 py-1'><CurrencyFormatter amount={product.productPrice} /></td>
                    <td className='border border-gray-800 py-1'>{product.quantity}</td>
                    <td className='border border-gray-800 py-1'><CurrencyFormatter amount={product.quantity * product.productPrice} /></td>
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