import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { FC } from "react"

type Props = {
    setPage : (value:number) => void; 
    page : number;
    maxPage : number;
    params : URLSearchParams
    loadingFetchData : boolean;
}

const Pagination : FC<Props> = ({ page, setPage, maxPage, params, loadingFetchData }) => {

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
    <div className="lg:w-max h-10 absolute -bottom-4 lg:-bottom-10 right-1/2  translate-x-1/2  lg:mt-20 mx-auto flex items-center justify-center gap-2 lg:gap-4 text-2xl lg:text-3xl">
        <button disabled={page === 1 || loadingFetchData} onClick={() => handlePagination("prev")} className="border rounded-full bg-black text-white hover:bg-black/70 active:bg-black/50 disabled:bg-black/50"><ChevronLeft size={30} /></button>
        <span className="text-black font-bold">{page}</span>
        <button disabled={page === maxPage || loadingFetchData} onClick={() => handlePagination("next")} className="border rounded-full bg-black text-white hover:bg-black/70 active:bg-black/50 disabled:bg-black/50"><ChevronRight size={30} /></button>
        <p className="absolute -bottom-6 lg:-bottom-10 w-max text-lg">{page !== maxPage && `${page}...`}{maxPage}</p>
    </div>
  )
}

export default Pagination