import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query"

type useProdctsQueryReturn  = {
    products : Product[];
    categories : string[];
    isNextPage : boolean;
}

export const useProductsQuery = ({
    queryKey, endpoint = "", queries = ""
} : { queryKey : string; endpoint? : string, queries? : string  }) => {
    return useQuery({
        queryKey : ["products", queryKey],
        queryFn : async () : Promise<useProdctsQueryReturn | null>=>   {
            try {
                const res = await fetch(`/api/products/${endpoint}${queries}`)
                if(!res.ok) throw new Error("Failed to get products")
                return res.json()
            } catch (error) {
                console.log("Error : " , error)
                return null
            }
        }
    })
}