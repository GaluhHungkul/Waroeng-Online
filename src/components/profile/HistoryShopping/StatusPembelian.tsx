import { FC } from "react"

type Props = {
     paymentMethod: "COD" | "Transfer" | "Credit Card" | "PayPal"
    paymentStatus: "unpaid" | "paid"
    orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}

const StatusPembelian : FC<Props> = ({ paymentMethod, paymentStatus, orderStatus }) => {
  return (
    <div className="text-sm space-y-2 mt-4">
        <p className="flex justify-between mb-4">Metode pembayaran : <span>{paymentMethod}</span></p>
        <p className="flex justify-between">Status pembayaran : <span className={`${paymentStatus === "unpaid" ? "bg-yellow-500" : "bg-green-400"} px-4 py-1 rounded text-white font-semibold`}>{paymentStatus}</span></p>
        <p className="flex justify-between items-center">Status pengiriman : <span className={`${orderStatus === "pending" ? "bg-yellow-500" : "bg-green-400"} px-4 py-1 rounded text-white font-semibold`}>{orderStatus}</span></p>
    </div>
  )
}

export default StatusPembelian