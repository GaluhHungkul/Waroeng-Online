import { Skeleton } from '../ui/skeleton'

const SkeletonHistoryShopping = () => {
  return (
    <div className='space-y-20'>
        {Array.from({ length : 3 }).map((_,i) => (
            <div key={i}>
                <Skeleton className='w-2/5 mr-auto bg-black/30 h-4 mb-6'/>
                <Skeleton className='bg-black/30 h-4'/>
                <Skeleton className='bg-black/30 h-4 mt-2'/>
                <Skeleton className='bg-black/30 h-4 mt-2'/>
                <Skeleton className='bg-black/30 h-4 mt-8'/>
                <Skeleton className='w-2/5 ml-auto bg-black/30 h-4 mt-2'/>
            </div>
        ))}
    </div> 
  )
}

export default SkeletonHistoryShopping