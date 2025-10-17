import { ProductsResponse } from "@/types/api_response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const DATA_PER_REQUST = 12

export const useProductsQuery = ({ queryKey="", queries="", endpoint="", page=1 } : { queries? : string; endpoint? : string, queryKey? : string; page? : number } = {}) => useQuery({
    queryKey : ["products", page, queryKey ],
    queryFn : async () => {
        console.log({queries, page})
        const res = await axios.get<ProductsResponse>(`${process.env.NEXT_PUBLIC_DUMMY_JSON_PRODUCT_API}${endpoint}?limit=${DATA_PER_REQUST * page}&${queries}`)
        if(res.status !== 200) throw new Error("Failed get products data")
        console.log(res.data)
        return res.data
    }
})