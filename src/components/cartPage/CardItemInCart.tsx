import { ProductInCart } from "@/types/cart"
import Image from "next/image"
import DetailCardItem from "./DetailCardItem"
import Link from "next/link"

const CardItemInCart = (product : ProductInCart) => {
  const { title, id, thumbnail } = product
  return (
    <div className="flex justify-between shadow rounded py-4 gap-4">
      <Link href={`/products/detail/${id}`} className="relative flex-1 aspect-square ">
        <Image priority src={thumbnail} alt={title} fill className="object-cover" sizes="80vw"/>
      </Link>
      <DetailCardItem {...product}/>
    </div>
  )
}

export default CardItemInCart