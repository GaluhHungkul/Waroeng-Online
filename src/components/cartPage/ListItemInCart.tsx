import useCart from "@/zustand/useCart"
import CardItemInCart from "./CardItemInCart"

const ListItemInCart = () => {

    const { cart } = useCart()

  return (
    <div className="flex flex-col gap-4 min-h-[40vh] mb-8 max-h-[50vh] pb-4 overflow-y-auto">
      {cart.map(item => <CardItemInCart key={item.id} {...item}/>)}
    </div>
  )
}

export default ListItemInCart