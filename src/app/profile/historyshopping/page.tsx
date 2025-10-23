import Title from "@/components/common/Title"
import ListHistoryShopping from "@/components/profile/HistoryShopping/ListHistoryShopping"

const HistoryShoppingPage = () => {  

  return (
    <div className='backdrop-blur-md px-3 py-5 lg:p-10 w-full md:w-4/5 md:mx-auto lg:px-0 lg:w-3/5'>
      <Title className="relative">History Shopping</Title>
      <ListHistoryShopping />
    </div>
  )
}

export default HistoryShoppingPage