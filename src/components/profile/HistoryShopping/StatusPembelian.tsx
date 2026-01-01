import { CheckCheck } from "lucide-react"
import { FC } from "react"
import FormatedDate from "../FormatedDate"
import Link from "next/link"

type Props = {
  paymentType: string
  paymentStatus: "unpaid" | "paid" | "failed"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date;
  paymentLink?: string | undefined | null
}

const StatusPembelian : FC<Props> = ({ paymentType, paymentStatus, createdAt, paymentLink }) => {
  return (
    <div className="text-sm space-y-2 mt-8 md:text-xl text-gray-700 font-bold border-b border-gray-300 pb-4 mb-4 md:mb-6 lg:flex-1 lg:border-none lg:font-medium lg:text-base">
        <div className="flex justify-between lg:justify-start lg:gap-4 ">Status : <p className={`text-gray-500 flex items-center gap-2 relative after:absolute after:size-4 after:rounded-full after:-right-5 after:top-1/2 after:-translate-y-1/2  ${paymentStatus == "paid" ? "" : "after:bg-gray-400 lg:after:-right-6 after:animate-pulse mr-4"}`}>
        <span>{paymentStatus}</span>
        {paymentStatus == "paid" && <CheckCheck className="text-gray-500"/>}
        </p></div>
        {paymentType 
          ? <p className="flex justify-between lg:justify-start lg:gap-4">Metode : <span className="text-gray-500">{paymentType.replace("_", " ")}</span></p>
          : <Link href={paymentLink ?? ""} target="_blank" className="flex underline justify-between lg:justify-start lg:gap-4">Klik disini untuk bayar</Link>
        }
        <p className="flex justify-between lg:justify-start lg:gap-4 mb-4">Date <span className="text-gray-500"><FormatedDate date={createdAt}/></span></p>
    </div>
  )
}

export default StatusPembelian