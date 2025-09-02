import { create } from "zustand";
import { Product } from "@/types/product";


interface IuseProducts {
    products : Product[];
    setProducts : (value:Product[]) => void;
    minStock : (value : number) => void
}

const useProducts = create<IuseProducts>((set) => ({
    products : [],
    setProducts : (value) => set({ products : value }),
    minStock : (value) => {
        set((state) => ({ products : state.products.map(a => (
        a._id === value ? { ...a, stock : a.stock - 1 } : a
    )) }))
    }
}))

export default useProducts