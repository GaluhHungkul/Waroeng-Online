import CurrencyFormatter from "../CurrencyFormatter"

const PriceAndDiscount = ({ price, className, priceAfterDiscount } : { price : number; className? : string; priceAfterDiscount : number }) => {


  return (
    <div className={`text-4xl text-gray-700 flex items-center gap-5 lg:text-6xl ${className}`}>
        <CurrencyFormatter amount={priceAfterDiscount || 0}/>
        <CurrencyFormatter amount={price || 0} lineThrough />
    </div>
  )
}

export default PriceAndDiscount