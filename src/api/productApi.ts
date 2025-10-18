import { ProductsResponse } from "@/types/api_response";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const DATA_PER_REQUST = 12

export const useProductsQuery = ({ queryKey="", page=1, sortBy="", order="", category="", queries="" } : { queryKey? : string; page? : number, sortBy? : string, order? : string; category? : string | null; queries? : string } = {}) => useQuery({
    queryKey : ["products", page, queryKey, sortBy, order, category ],
    queryFn : async () => {
        const endpointCategory = category === null || category === "all" || category.trim().length < 1 ? "" : `/category/${category}`
        const paramsSortBy = sortBy.trim().length < 1 || sortBy === null ? "" : `&sortBy=${sortBy}`
        const paramsOrder = order.trim().length < 1 || order === null ? "" : `&order=${order}`
        const res = await axios.get<ProductsResponse>(`${process.env.NEXT_PUBLIC_DUMMY_JSON_PRODUCT_API}${endpointCategory}?limit=${DATA_PER_REQUST * page}${paramsOrder}${paramsSortBy}&${queries}`)
        if(res.status !== 200) throw new Error("Failed get products data")
        return res.data
    }
})

export const useSearchProductsQuery = ({
    q="", page=1, sortBy="", order=""
}: { q : string, page? : number; sortBy? : string; order? : string }) => useQuery({
    queryKey : ["search", "products", q, page, sortBy, order],
    queryFn : async () => {
        const paramsSortBy = sortBy.trim().length < 1 || sortBy === null ? "" : `&sortBy=${sortBy}`
        const paramsOrder = order.trim().length < 1 || order === null ? "" : `&order=${order}`
        const res = await axios.get<ProductsResponse>(`${process.env.NEXT_PUBLIC_DUMMY_JSON_PRODUCT_API}/search?q=${q}&select=title,category,thumbnail,price,rating,stock&limit=${DATA_PER_REQUST * page}${paramsOrder}${paramsSortBy}`)
        if(res.status !== 200) throw new Error("Failed get products data")
        console.log(res.data)
        return res.data
    }
})