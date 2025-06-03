"use client"

import HistoryShopping from '@/components/profile/HistoryShopping'
import useUser from '@/zustand/useUser'

const HistoryShoppingPage:React.FC = () => {

  const { user } = useUser()

  return (
    <div className='backdrop-blur-md px-3 py-5 lg:p-10  w-full'>
        <h1 className='text-black lg:text-3xl font-bold mb-10'>History Shopping</h1>
        {user?.historyShopping.length 
        ? 
          <HistoryShopping user={user}/>
        :
        <h1>Tidak ada transaksi</h1>
        }
    </div>
  )
}

export default HistoryShoppingPage