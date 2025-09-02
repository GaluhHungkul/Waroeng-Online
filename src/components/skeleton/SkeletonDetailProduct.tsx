import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonDetailProduct = () => {
  return (
    <>
      <Skeleton className='bg-gray-200 h-72'/>
      <div className='pt-2 lg:pt-4 lg:px-4 space-y-1 lg:space-y-4'>
        <Skeleton className='w-3/5 h-4'/>
        <Skeleton className='w-4/5 h-4'/>
        <Skeleton className='w-2/5 h-4'/>
        <Skeleton className='w-2/3 h-4'/>
      </div>
    </>
  )
}

export default SkeletonDetailProduct