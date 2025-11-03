"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useDialogLoginCard from "@/zustand/useDialogAuthCard"
import GoogleLoginButton from "../tags/GoogleLoginButton"
import SignUpForm from "./SignUpForm"

const SignUpCard = () =>  {

  const { showAuthCard, setShowAuthCard  } = useDialogLoginCard()

  return (
    <Dialog open={showAuthCard === "signUp"} onOpenChange={(open) => {
      if(!open) setShowAuthCard(null)
    }}>
      <DialogContent className="w-4/5 rounded py-10">
      <DialogHeader className="md:mb-12 lg:mb-6">
        <DialogTitle className="text-center md:text-2xl">Create your account</DialogTitle>
        <DialogDescription className="text-center md:text-xl">
          Welcome! Please fill in the details to get started.
        </DialogDescription>
      </DialogHeader>
      <SignUpForm />
      <p className="text-center my-2 text-gray-500 relative before:absolute before:w-2/5 before:left-0 before:border before:top-1/2 before:-translate-y-1/2 after:absolute after:w-2/5 after:right-0 after:border after:top-1/2 after:-translate-y-1/2 md:text-2xl lg:my-1">or</p>
      <DialogFooter className="flex-col gap-2 md:flex-col">
        <GoogleLoginButton />
        <p className="text-gray-500  text-sm text-center mt-2 md:text-base">Already have an account? <span onClick={() => setShowAuthCard("signIn")} className="text-gray-800 font-bold cursor-pointer">Sign In</span></p>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default SignUpCard