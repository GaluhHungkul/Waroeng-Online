import { DetailProduct, Product, ProductsResponse } from "@/types/api_response";
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

export const useDetailProductQuery = ({ id } : { id : string }) => useQuery({
    queryKey : ["product", id ],
    queryFn : async () => {
        const res = await axios.get<DetailProduct>(`${process.env.NEXT_PUBLIC_DUMMY_JSON_PRODUCT_API}/${id}`)
        if(res.status !== 200) throw new Error("Failed get products data")
        const similarProducts = await getSimilarProducts(res.data.category, id)
        return {
            detailProduct : {
                ...res.data, 
                priceAfterDiscount : res.data.price - (res.data.price * res.data.discountPercentage / 100)
            },
            similarProducts
        }
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

const getSimilarProducts = async (category:string, id:string) : Promise<Product[]> => {
    const res = await axios.get<ProductsResponse>(`${process.env.NEXT_PUBLIC_DUMMY_JSON_PRODUCT_API}/category/${category}?limit=9`)
    if(res.status !== 200) throw new Error("Failed get similar products data")
    return res.data.products.filter(p => p.id !== Number(id)).slice(0,8)
}