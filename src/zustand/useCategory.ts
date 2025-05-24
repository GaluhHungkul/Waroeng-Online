import { create } from "zustand";

interface CategoryStore {
    userCategory : string[];
    setCategory : (value:string) => void
}

const useCategory = create<CategoryStore>((set) => ({
    userCategory : [],
    setCategory : (value:string) => set((state) => {
        if(!state.userCategory.includes(value)) {
            return { userCategory : [...state.userCategory, value] }
        } else {
            return { userCategory : state.userCategory.filter(el => el != value) }
        }
    })
}))


export default useCategory