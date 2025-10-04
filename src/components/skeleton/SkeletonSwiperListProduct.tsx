import { Skeleton } from "../ui/skeleton"

const SkeletonSwiperListProduct = () => {
  return (
    <div className="mt-5 md:mt-10 lg:mt-14">
        <Skeleton className="h-6 w-2/3 my-5 md:h-8 md:w-1/2"/>
        <section className="flex items-center w-full gap-5">
          <Skeleton className="h-[450px] flex-1 md:h-[340px]"/>
          <Skeleton className="hidden flex-1 md:block md:h-[340px]"/>
          <Skeleton className="hidden flex-1 md:block md:h-[340px]"/>
          <Skeleton className="hidden flex-1 lg:block md:h-[340px]"/>
          <Skeleton className="hidden flex-1 lg:block md:h-[340px]"/>
        </section>
    </div>
  )
}

export default SkeletonSwiperListProduct