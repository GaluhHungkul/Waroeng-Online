import DeskripsiProduct from "./DeskripsiProduct"
import StatusPembelian from "./StatusPembelian"
import TotalPriceAndNavigation from "./TotalPriceAndNavigation"
import { FC } from "react"
import { Order } from "@/types/order"
import { Box } from "lucide-react"

type Props = {
  order : Order
}


const HistoryShopping : FC<Props> = ({ order : { orderedProducts, orderStatus, createdAt, paymentStatus, totalPrice, midtrans : { paymentType, paymentLink }  } }) => {

  return (
    <div className='relative flex flex-col py-4 mb-10 border-y md:pb-10 lg:flex-row lg:gap-12 md:py-6 lg:py-0 border-gray-400'>
      <section className="flex items-center gap-4 md:gap-20 lg:flex-[3]">
        <div className="bg-primary-orange/20 rounded p-2 md:scale-150 relative md:left-4">
          <Box size={48} className="text-primary-orange"/>
        </div>
        <section className="max-h-16 overflow-y-auto md:max-h-20 lg:max-h-24">
          {orderedProducts.map(({ name, price, quantity, productId }) => (
            <DeskripsiProduct key={productId} name={name} quantity={quantity} price={price}/>
          ))}
        </section>
      </section>
      <StatusPembelian createdAt={createdAt} paymentType={paymentType} paymentLink={paymentLink} paymentStatus={paymentStatus} orderStatus={orderStatus}/>
      <TotalPriceAndNavigation totalPrice={totalPrice} totalItems={orderedProducts.length}/>
    </div>
  )
}

export default HistoryShopping