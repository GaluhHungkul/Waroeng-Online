import { create } from "zustand";
import { Products } from "@/types/products";

interface IuseProducts {
    products : Products[];
    setProducts : (value:Products[]) => void
}

const useProducts = create<IuseProducts>((set) => ({
    products : [],
    setProducts : (value) => set({ products : value })
}))

export default useProducts