import { ProductsResponse } from "@/types/api_response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export const useProductsQuery = ({ queryKey="", queries="", endpoint="" } : { queries? : string; endpoint? : string, queryKey? : string } = {}) => useQuery({
    queryKey : ["products", queryKey ],
    queryFn : async () => {
        console.log({queries})
        const res = await axios.get<ProductsResponse>(`${process.env.NEXT_PUBLIC_DUMMY_JSON_PRODUCT_API}${endpoint}?limit=10&${queries}`)
        if(res.status !== 200) throw new Error("Failed get products data")
        return res.data
    }
})