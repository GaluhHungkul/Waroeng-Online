import CurrencyFormatter from '../CurrencyFormatter'

const DialogTotalPrice = ({ quantity, price } : { quantity : number, price : number }) => {
  return (
    <section className="flex justify-between items-center pb-2 md:text-xl">
        <p>Total Price</p> 
        <p>{quantity ?  <CurrencyFormatter amount={quantity * (price)}/> : "-"}</p>
    </section>
  )
}

export default DialogTotalPrice