import Title from "@/components/common/Title"
import HistoryShopping from "@/components/profile/HistoryShopping"

const HistoryShoppingPage = () => {  

  return (
    <div className='backdrop-blur-md px-3 py-5 lg:p-10 w-full md:w-4/5 md:mx-auto'>
      <Title className="relative">History Shopping</Title>
      <HistoryShopping />
    </div>
  )
}

export default HistoryShoppingPage