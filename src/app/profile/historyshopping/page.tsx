import Sorting from "@/components/products/Sorting"
import ListHistoryShopping from "@/components/profile/HistoryShopping/ListHistoryShopping"

export const metadata = {
  title : "My Orders",
  description : "My orders page"
}

const HistoryShoppingPage = () => {  

  return (
    <div className='backdrop-blur-md min-h-screen px-3 py-5 lg:p-10 w-full md:w-4/5 md:mx-auto lg:px-0 lg:w-4/5'>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-gray-600 font-bold lg:text-xl">My Orders</h1>
        <Sorting orders/>
      </div>
      <ListHistoryShopping />
    </div>
  )
}

export default HistoryShoppingPage