import { create } from "zustand";
import { Products } from "@/types/products";


interface IuseProducts {
    products : Products[];
    setProducts : (value:Products[]) => void;
    minStock : (value : number) => void
}

const useProducts = create<IuseProducts>((set) => ({
    products : [],
    setProducts : (value) => set({ products : value }),
    minStock : (value) => set((state) => ({ products : state.products.map(a => (
        a._id == value ? { ...a, stock : a.stock - 1 } : a
    )) }))
}))

export default useProducts