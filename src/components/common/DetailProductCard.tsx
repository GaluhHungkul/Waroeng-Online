import { Product } from '@/types/api_response'
import PriceAndDiscount from '../detailProductPage/PriceAndDiscount';

const DetailProductCard = ({ product, similar } : { product : Product; similar : boolean }) => {
  return (
    <ul className=" py-2  text-black px-4  w-full">
        {!similar && <li className="italic font-semibold mb-2 text-gray-700">{product?.category}</li>}
        <li title={product.title} className="font-bold mb-1 md:text-lg line-clamp-1 text-gray-700">
          {product?.title}
        </li>
        <li className="text-gray-500 font-medium mb-1 line-clamp-1">
          {product?.description}
        </li>
        <li className="lg:text-base font-semibold text-gray-800 mt-1 mb-2">
          {product?.rating} / 5 ⭐
        </li>
        <li className="text-gray-900 font-bold text-lg lg:text-base">
          {/* <CurrencyFormatter amount={product.price} /> */}
          <PriceAndDiscount small price={product.price} priceAfterDiscount={product.priceAfterDiscount}/>
        </li>
      </ul>
  )
}

export default DetailProductCard