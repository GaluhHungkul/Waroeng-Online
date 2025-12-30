import { ProductInCart } from "@/types/cart"
import Image from "next/image"
import DetailCardItem from "./DetailCardItem"
import Link from "next/link"

const CardItemInCart = (product : ProductInCart) => {
  const { title, id, thumbnail } = product
  return (
    <div className="flex justify-between shadow rounded py-4 gap-4 border">
      <div className="relative w-1/2 aspect-square md:w-32 lg:w-1/2">
        <Link href={`/products/detail/${id}`}>
          <Image priority src={thumbnail} alt={title} fill className="object-cover object-center" sizes="50vw"/>
        </Link>
      </div>
      <DetailCardItem {...product}/>
    </div>
  )
}

export default CardItemInCart