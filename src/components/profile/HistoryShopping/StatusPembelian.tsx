import { FC } from "react"

type Props = {
  paymentMethod: "COD" | "Transfer" | "Credit Card" | "PayPal"
  paymentStatus: "unpaid" | "paid"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

const StatusPembelian : FC<Props> = ({ paymentMethod, paymentStatus, orderStatus }) => {
  return (
    <div className="text-sm space-y-2 mt-4 md:text-xl lg:text-xl text-gray-700 font-bold border-b border-gray-300 pb-4 mb-4 md:mb-6">
        <p className="flex justify-between mb-4">Metode pembayaran : <span className="text-gray-500">{paymentMethod}</span></p>
        <p className="flex justify-between pr-4">Status pembayaran : <span className="text-gray-500 relative after:absolute after:size-4 after:rounded-full after:-right-5 after:top-1/2 after:-translate-y-1/2 after:bg-orange-400 after:animate-pulse">{paymentStatus}</span></p>
        <p className="flex justify-between pr-4 items-center">Status pengiriman : <span className="text-gray-500 relative after:absolute after:size-4 after:rounded-full after:-right-5 after:top-1/2 after:-translate-y-1/2 after:bg-orange-400 after:animate-pulse">{orderStatus}</span></p>
    </div>
  )
}

export default StatusPembelian