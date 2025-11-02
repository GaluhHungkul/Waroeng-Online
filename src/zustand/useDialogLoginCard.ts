import { create } from "zustand";

type DialogLoginCard = {
    showLoginCard : boolean
    setShowLoginCard : (val:boolean) => void
}

const useDialogLoginCard = create<DialogLoginCard>()((set) => ({
    showLoginCard : false,
    setShowLoginCard : (val) => set({ showLoginCard : val }),
}))

export default useDialogLoginCard