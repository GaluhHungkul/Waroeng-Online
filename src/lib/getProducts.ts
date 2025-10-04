import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query"

type useProdctsQueryReturn  = {
    products : Product[];
    categories : string[];
    isNextPage : boolean;
}

export const useProductsQuery = ({
    key, route = "", queries = ""
} : { key : string; route? : string, queries? : string  }) => {
    return useQuery({
        queryKey : ["products", key],
        queryFn : async () : Promise<useProdctsQueryReturn | null>=>   {
            try {
                const res = await fetch(`/api/products/${route}${queries}`)
                if(!res.ok) throw new Error("Failed to get products")
                return res.json()
            } catch (error) {
                console.log("Error : " , error)
                return null
            }
        }
    })
}