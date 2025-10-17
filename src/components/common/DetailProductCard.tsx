import { Product } from '@/types/api_response'
import CurrencyFormatter from '../CurrencyFormatter'

const DetailProductCard = ({ product, similar } : { product : Product; similar : boolean }) => {
  return (
    <ul className=" py-2  text-black px-4  text-sm w-full ">
        {!similar && <li className="italic font-semibold mb-2 text-gray-700">{product?.category}</li>}
        <li className="font-bold mb-1">
          {product?.title}
        </li>
        <li className="text-gray-500">
        <CurrencyFormatter amount={product.price} />
        </li>
        <li className="text-sm">
          {product?.rating} / 5 ⭐
        </li>
        <li className="text-gray-800">Stock : {product?.stock}</li>
      </ul>
  )
}

export default DetailProductCard