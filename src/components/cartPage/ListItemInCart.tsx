import useCart from "@/zustand/useCart"
import CardItemInCart from "./CardItemInCart"

const ListItemInCart = () => {

    const { cart } = useCart()

  return (
    <div className="grid grid-cols-1 gap-4 min-h-[40vh] mb-8 max-h-[50vh] pb-4 overflow-y-auto md:max-h-[60vh] lg:grid-cols-2 lg:gap-2 lg:mb-0 lg:flex-[3]">
      {cart.map(item => <CardItemInCart key={item.id} {...item}/>)}
    </div>
  )
}

export default ListItemInCart