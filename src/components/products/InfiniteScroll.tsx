import { usePathname, useRouter } from "next/navigation";
import { FC } from "react"
import { Button } from "../ui/button";

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

  return <Button  onClick={handleShowMoreProducts} disabled={isPending} variant={"outline"}  className="absolute right-1/2 translate-x-1/2  py-1 rounded-full ">{isPending ? "Loading..." : "Show more"}</Button>
}

export default InfiniteScroll