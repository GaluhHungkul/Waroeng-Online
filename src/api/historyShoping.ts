import { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export const useHistoryShopping = () => useQuery({
    queryKey : ["history_shopping",  ],
    queryFn : async () => {
        const res = await axios.get<Order[]>("/api/user/historyShopping")    
        if(res.status !== 200) throw new Error("Failed get products data")
        return res.data
    }
})