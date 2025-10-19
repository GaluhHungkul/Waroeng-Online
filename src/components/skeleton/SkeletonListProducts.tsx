import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonListProducts = ({ isSearchProductsPage=false } : { isSearchProductsPage? : boolean }) => {
    return (
        <>
            <div className="mb-5">
                <Skeleton className='h-8' />
                <section className="flex justify-between mt-4 mb-8 items-center gap-5">
                    <Skeleton className='h-8 w-1/2'/>
                    {!isSearchProductsPage && <Skeleton className='h-8 w-1/2'/>}
                </section>
                <Skeleton className='h-5 w-1/2'/>
            </div>
            <div className='grid grid-cols-2 w-full gap-3 md:grid-cols-3 lg:grid-cols-6 md:gap-5 md:p-4 lg:p-0 lg:pt-2'>
            {Array.from({ length : 12 }).map((_, index) => (
                <div key={index}>
                    <div className="w-full max-w-sm rounded-2xl border p-4 shadow-sm space-y-4">                    
                    <Skeleton className="h-40 w-full rounded-xl bg-gray-300" />                  
                    <Skeleton className="h-5 w-3/4 bg-gray-300" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-5/6 bg-gray-300" />
                    </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default SkeletonListProducts