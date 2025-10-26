import React from 'react'
import { Skeleton } from '../ui/skeleton'
import SkeletonListProducts from './SkeletonListProducts'

const SkeletonDetailProduct = () => {
  return (
    <div className='w-[90%] mx-auto mt-4 md:mt-8 lg:w-4/5'>
      <section className='flex flex-col md:flex-row md:gap-6 lg:gap-16 lg:mb-20'>
        <div>
          <Skeleton className='bg-gray-200 aspect-[1/1] w-full'/>
          <section className='flex gap-2.5 md:gap-2 mt-2'>
            {Array(4).fill(null).map((_,i) => (
              <Skeleton key={i} className='aspect-[1/1] w-20 md:w-[85px] lg:w-[97px]'/>
            ))}
          </section>
        </div>
        <div className='pt-2 lg:pt-4 lg:px-4 space-y-4 md:space-y-6 mb-10 md:mb-20 md:w-1/2 lg:w-2/3 lg:space-y-8'>
          <Skeleton className='w-4/5 h-6'/>
          <Skeleton className='w-1/5 h-5 '/>
          <section className='space-y-2 md:space-y-3 '>
            <Skeleton className='w-4/5 h-4'/>
            <Skeleton className='w-4/5 h-4'/>
            <Skeleton className='w-4/5 h-4'/>
            <Skeleton className='w-4/5 h-4'/>
          </section>
          <section className="flex pt-4 items-center mt-4 gap-5">
            <Skeleton className='w-2/5 h-6 md:h-10'/>
            <Skeleton className='w-2/5 h-6 md:h-10'/>
          </section>
          <section className='py-4 gap-4'>
            <div className='flex justify-between h-10'>
              <Skeleton className='h-4 w-20 md:h-8 md:w-28'/>
              <Skeleton className='h-4 w-20 md:h-8 md:w-28' />
            </div>
            <div className='flex justify-between h-10'>
              <Skeleton className='h-4 w-20 md:h-8 md:w-28'/>
              <Skeleton className='h-4 w-20 md:h-8 md:w-28' />
            </div>
          </section>
          <section className='mt-4 w-full font-bold flex gap-3 lg:text-xl md:'>
            <Skeleton className='w-full h-10 lg:h-16'/>
            <Skeleton className='w-full h-10 lg:h-16'/>
          </section>
        </div>
      </section>
      <section>
        <Skeleton className='h-8 w-1/2 mx-auto mb-10 md:mb-20' />
        <SkeletonListProducts similar />
      </section>
    </div>
  )
}

export default SkeletonDetailProduct