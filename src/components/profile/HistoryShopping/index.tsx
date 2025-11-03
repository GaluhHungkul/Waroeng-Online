import FormatedDate from "../FormatedDate"
import DeskripsiProduct from "./DeskripsiProduct"
import StatusPembelian from "./StatusPembelian"
import { Clock} from "lucide-react"
import ProductImage from "./ProductImage"
import TotalPriceAndNavigation from "./TotalPriceAndNavigation"
import { FC } from "react"
import { Order } from "@/types/order"

type Props = {
  order : Order
}


const HistoryShopping : FC<Props> = ({ order : { orderedProduct : {  img, name, quantity, price, id, }, createdAt, paymentStatus, orderStatus, totalPrice,paymentMethod  } }) => {

  return (
    <div className='relative pb-8 mb-10 border-b border-primary-orange md:border-b-4 md:pb-10'>
      <div className="flex justify-between items-center mb-4 text-sm md:text-base md:mb-6 lg:text-lg">
        <h1 className='text-gray-400 flex items-center gap-2'><Clock /><FormatedDate date={createdAt}/></h1>
        </div>
      <div className="flex gap-4 justify-between">
        <ProductImage img={img} name={name}/>
        <DeskripsiProduct name={name} quantity={quantity} price={price}/>
      </div>
      <StatusPembelian paymentMethod={paymentMethod} paymentStatus={paymentStatus} orderStatus={orderStatus}/>
      <TotalPriceAndNavigation totalPrice={totalPrice} id={id}/>
    </div>
  )
}

export default HistoryShopping