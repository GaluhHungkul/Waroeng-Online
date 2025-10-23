import CurrencyFormatter from "../CurrencyFormatter"

const PriceAndDiscount = ({ price, discountPercentage=0 } : { price : number; discountPercentage : number }) => {

    const priceAfterDiscount = price - (price * discountPercentage / 100)

  return (
    <div className='text-4xl text-gray-700 flex items-center gap-5'>
        <CurrencyFormatter amount={priceAfterDiscount || 0}/>
        <CurrencyFormatter amount={price || 0} lineThrough />
    </div>
  )
}

export default PriceAndDiscount