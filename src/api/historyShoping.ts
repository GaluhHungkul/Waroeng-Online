import { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export const useHistoryShopping = ({ sortBy } : { sortBy?: string }) => useQuery({
    queryKey : ["history_shopping", sortBy],
    queryFn : async () => {
        const res = await axios.get<Order[]>("/api/user/historyShopping")    
        if(res.status !== 200) throw new Error("Failed get products data")
        const sorted = res.data?.sort((a,b) => sortBy === "unpaid" ? b.paymentStatus.localeCompare(a.paymentStatus) : a.paymentStatus.localeCompare(b.paymentStatus))
        return sorted
    }
})