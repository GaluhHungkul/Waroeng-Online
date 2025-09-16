import { FC } from "react"

type Props = {
     paymentMethod: "COD" | "Transfer" | "Credit Card" | "PayPal"
    paymentStatus: "unpaid" | "paid"
    orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

const StatusPembelian : FC<Props> = ({ paymentMethod, paymentStatus, orderStatus }) => {
  return (
    <div className="text-sm space-y-2 mt-4 md:text-lg lg:text-xl">
        <p className="flex justify-between mb-4">Metode pembayaran : <span>{paymentMethod}</span></p>
        <p className="flex justify-between">Status pembayaran : <span className={`${paymentStatus === "unpaid" ? "bg-yellow-500" : "bg-green-400"} px-4 py-1 rounded text-white font-semibold md:px-8`}>{paymentStatus}</span></p>
        <p className="flex justify-between items-center">Status pengiriman : <span className={`${orderStatus === "pending" ? "bg-yellow-500" : "bg-green-400"} px-4 py-1 rounded text-white font-semibold md:px-8`}>{orderStatus}</span></p>
    </div>
  )
}

export default StatusPembelian