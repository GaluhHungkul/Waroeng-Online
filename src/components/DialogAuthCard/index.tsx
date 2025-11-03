"use client"

import { Dialog } from "@/components/ui/dialog"
import useDialogAuthCard from "@/zustand/useDialogAuthCard"
import SignInCard from "./SignInCard"
import SignUpCard from "./SignUpCard"

const DialogAuthCard = () =>  {

  const { showAuthCard, setShowAuthCard  } = useDialogAuthCard()

  return (
    <Dialog open={showAuthCard === "signIn"} onOpenChange={(open) =>{
      if(!open) setShowAuthCard(null)
    }}>
      {showAuthCard === "signIn" ? <SignInCard /> : <SignUpCard />}
    </Dialog>
  )
}

export default DialogAuthCard