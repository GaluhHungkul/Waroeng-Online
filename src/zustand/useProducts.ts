import { create } from "zustand";
import { Product } from "@/types/api_response";


interface IuseProducts {
    products : Product[];
    setProducts : (value:Product[]) => void;
}

const useProducts = create<IuseProducts>((set) => ({
    products : [],
    setProducts : (value) => set({ products : value }),
}))

export default useProducts