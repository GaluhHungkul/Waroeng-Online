import { TypeUser } from "@/types/user";
import { create } from "zustand";

type useUser = {
    user : TypeUser | null
    setUser : (value:TypeUser) => void
}

const useUser = create<useUser>()((set) => ({
    user : null,
    setUser : (value) => {
        set(() => ({ user : value }))
    }
}))

export default useUser