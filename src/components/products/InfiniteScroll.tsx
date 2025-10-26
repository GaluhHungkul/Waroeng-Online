import { usePathname, useRouter } from "next/navigation";
import { FC } from "react"

type Props = {
    params : URLSearchParams;
    isShowMore : boolean;
    paramsPage : number
    isPending : boolean
}

const InfiniteScroll : FC<Props> = ({ params, isShowMore, paramsPage, isPending }) => {


  const router = useRouter()
  const pathname = usePathname()

  const handleShowMoreProducts = async () => {
    params.set("page", (paramsPage + 1).toString())
    router.push(`${pathname}?${params.toString()}`, { scroll : false })
  }

  if(!isShowMore) return null

  return <button onClick={handleShowMoreProducts} disabled={isPending}  className="absolute right-1/2 translate-x-1/2 border-2 border-black w-1/2 font-semibold text-xl py-1 rounded hover:bg-black hover:text-white active:bg-black/80 duration-100 disabled:bg-black/70 disabled:border-none disabled:text-white">{isPending ? "Loading..." : "Show more"}</button>
}

export default InfiniteScroll