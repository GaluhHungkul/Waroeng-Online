import { create } from "zustand";

interface CategoryStore {
    userCategory : string[];
    setCategory : (value:string | string[]) => void
}

const useCategory = create<CategoryStore>()((set, get) => ({
    userCategory : [],
    setCategory : (value) => {
        if(typeof value === "string") {
            const { userCategory } = get()
            if(userCategory.includes(value)) set((state) => ({ userCategory : state.userCategory.filter(item => item !== value) }))
            else set((state) => ({ userCategory : [...state.userCategory, value] }))
        } else {
            set(() => ({ userCategory : value }))
        }
    }
}) ) 



export default useCategory