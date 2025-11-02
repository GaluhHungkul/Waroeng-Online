"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useDialogLoginCard from "@/zustand/useDialogLoginCard"
import GoogleLoginButton from "../tags/GoogleLoginButton"
import LoginForm from "../Login/LoginForm"

const DialogLoginCard = () =>  {

  const { showLoginCard, setShowLoginCard  } = useDialogLoginCard()

  return (
    <Dialog open={showLoginCard} onOpenChange={setShowLoginCard}>
      <DialogContent className="w-4/5 rounded py-10 lg:top-[52%]">
      <DialogHeader className="md:mb-12">
        <DialogTitle className="text-center md:text-2xl">Sign In to WaroengOnline</DialogTitle>
        <DialogDescription className="text-center md:text-xl">
          Welcome! Please sign in to continue
        </DialogDescription>
      </DialogHeader>
      <LoginForm />
      <p className="text-center my-4 text-gray-500 relative before:absolute before:w-2/5 before:left-0 before:border before:top-1/2 before:-translate-y-1/2 after:absolute after:w-2/5 after:right-0 after:border after:top-1/2 after:-translate-y-1/2 md:text-2xl">or</p>
      <DialogFooter className="flex-col gap-2 md:flex-col">
        <GoogleLoginButton />
        <p className="text-gray-500  text-sm text-center mt-2 md:text-base">Don{"'"}t have an account yet? <span className="text-gray-800 font-bold">Sign Up</span></p>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default DialogLoginCard