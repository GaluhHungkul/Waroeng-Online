import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { FC } from "react"

type Props = {
    setPage : (value:number) => void; 
    page : number;
    maxPage : number;
    params : URLSearchParams
}

const Pagination : FC<Props> = ({ page, setPage, maxPage, params }) => {

    const router = useRouter()

    const handlePagination = (value:string) => {
        if(value === "prev" && page > 1) {
            setPage(page - 1)
            if(page - 1 === 1) {
                params.delete("page")
                router.replace(`/products?${params.toString()}`, { scroll : false })
            } else {
                params.set("page", page - 1 + "")
                router.replace(`/products?${params.toString()}`, { scroll : false })
            }
        } else if(value === "next" && page < maxPage) {
            params.set("page", page + 1 + "")
            setPage(page + 1)
            router.replace(`/products?${params.toString()}`, { scroll : false })
        }        
    }
    
  return (
    <div className="lg:w-max h-10 lg:mt-20 mx-auto flex items-center justify-center lg:gap-4">
        <button onClick={() => handlePagination("prev")} className="border rounded-full bg-secondary hover:bg-secondary/70 active:bg-secondary/50  "><ChevronLeft /></button>
        <span className="lg:text-xl text-secondary">{page}</span>
        <button onClick={() => handlePagination("next")} className="border rounded-full bg-secondary hover:bg-secondary/70 active:bg-secondary/50  "><ChevronRight /></button>
    </div>
  )
}

export default Pagination