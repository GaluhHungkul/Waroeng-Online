import CurrencyFormatter from '@/components/CurrencyFormatter'

const TotalPriceAndNavigation = ({ totalPrice, totalItems } : { totalPrice : number; totalItems : number }) => {
  return (
    <section className="flex items-center justify-between md:text-xl lg:flex-1 lg:flex-col lg:justify-center lg:gap-4 text-gray-600">
      <p className='text-sm md:text-base font-semibold lg:text-base'>Items : {totalItems}</p>
      <p className='text-sm md:text-base font-semibold lg:text-base'><CurrencyFormatter amount={totalPrice} /></p>
    </section>
  )
}

export default TotalPriceAndNavigation