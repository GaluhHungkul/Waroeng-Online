import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonListProducts = () => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-5 md:gap-5 md:p-4 lg:p-0 lg:pt-2'>
            {Array.from({ length : 10 }).map((_, index) => (
                <div key={index}>
                    <div className="w-full max-w-sm rounded-2xl border p-4 shadow-sm space-y-4">                    
                    <Skeleton className="h-40 w-full rounded-xl bg-gray-300" />                  
                    <Skeleton className="h-5 w-3/4 bg-gray-300" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gray-300" />
                        <Skeleton className="h-4 w-5/6 bg-gray-300" />
                    </div>
                    <Skeleton className="h-9 w-24 rounded-md bg-gray-300 mx-auto" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonListProducts