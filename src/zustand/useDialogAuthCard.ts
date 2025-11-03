import { create } from "zustand";

type DialogAuthCard = {
    showAuthCard : "signIn" | "signUp" | null
    setShowAuthCard : (val:"signIn" | "signUp" | null) => void
}

const useDialogAuthCard = create<DialogAuthCard>()((set) => ({
    showAuthCard : null,
    setShowAuthCard : (val) => set({ showAuthCard : val }),
}))

export default useDialogAuthCard