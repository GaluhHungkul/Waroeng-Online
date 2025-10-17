import { useRouter } from "next/navigation";
import {  FC, useState } from "react"

type Props = {
    params : URLSearchParams;
    isShowMore : boolean;
    paramsPage : number
}

const InfiniteScroll : FC<Props> = ({ params, isShowMore, paramsPage   }) => {

  const [loadingGetShowMore, setLoadingGetShowMore] = useState<boolean>(false)

  const router = useRouter()

  const handleShowMoreProducts = async () => {
    setLoadingGetShowMore(true)
    params.set("page", (paramsPage + 1).toString())
    router.push(`/products?${params.toString()}`, { scroll : false })
    setLoadingGetShowMore(false)  
  }

  if(!isShowMore) return null

  return <button onClick={handleShowMoreProducts} disabled={loadingGetShowMore}  className="absolute right-1/2 translate-x-1/2 border-2 border-black w-1/2 font-semibold text-xl py-1 rounded hover:bg-black hover:text-white active:bg-black/80 duration-100 disabled:bg-black/70 disabled:border-none disabled:text-white">{loadingGetShowMore ? "Loading..." : "Show more"}</button>
}

export default InfiniteScroll