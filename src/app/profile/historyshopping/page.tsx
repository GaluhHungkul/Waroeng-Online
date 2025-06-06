"use client"

import HistoryShopping from '@/components/profile/HistoryShopping'
import { getUser } from '@/lib/getUser'
import useUser from '@/zustand/useUser'
import { useEffect } from 'react'

const HistoryShoppingPage:React.FC = () => {

  const { user, setUser } = useUser()

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser()
      setUser(data)
    }
    fetchUser()
  },[setUser])


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