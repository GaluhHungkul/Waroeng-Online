import { create } from "zustand";

interface CategoryStore {
    userCategory : string[];
    setCategory : (value:string) => void
}

const useCategory = create<CategoryStore>()((set, get) => ({
    userCategory : [],
    setCategory : (value:string) => {
        const { userCategory } = get()
        if(userCategory.includes(value)) set((state) => ({ userCategory : state.userCategory.filter(item => item !== value) }))
        else set((state) => ({ userCategory : [...state.userCategory, value] }))
    }
}) ) 



export default useCategory