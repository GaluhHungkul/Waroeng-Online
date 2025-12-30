import CurrencyFormatter from "../CurrencyFormatter"

const PriceAndDiscount = ({ price, className, priceAfterDiscount, small=false } : { price : number; className? : string; priceAfterDiscount : number; small? : boolean }) => {


  return (
    <div className={`${small ? "md:text-2xl lg:text-xl" : "text-4xl lg:text-6xl"} text-gray-700 flex items-center gap-5 ${className}`}>
        <CurrencyFormatter amount={priceAfterDiscount || 0}/>
        <CurrencyFormatter amount={price || 0} lineThrough small={small}/>
    </div>
  )
}

export default PriceAndDiscount