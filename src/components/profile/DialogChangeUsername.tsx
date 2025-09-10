import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen } from "lucide-react"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

const DialogChangeUsername = () => {

  const session = useSession()  

  const [open, setOpen] = useState(false)
  const [newUsername, setNewUsername] = useState("")
  const [loadingChangeUsername, setLoadingChangeUsername] = useState(false)

  const handleChangeUsername = async (e:FormEvent) => {
    try {
        e.preventDefault()
        if(newUsername.trim() === "" || newUsername.trim().length < 8) return
        setLoadingChangeUsername(true)
        const res = await fetch("/api/user/changeusername", {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newUsername)
        })
        if(!res.ok) throw new Error("Failed to change username")
        await session.update()
    } catch (error) {
        console.log("Error : " , error)
    } finally {
        setLoadingChangeUsername(false)
        setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pen fill="#000" size={16} className="cursor-pointer"/>
      </DialogTrigger>
      <DialogContent className="w-4/5 rounded">
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
          <DialogDescription>
            Change Your Username
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleChangeUsername}>
            <div className="w-full mb-6 mt-4">
                <Label htmlFor="link" className="sr-only">
                Link
                </Label>
                <Input required onChange={(e) => setNewUsername(e.target.value)} />
            </div>
            <Button disabled={loadingChangeUsername} className="w-full">{loadingChangeUsername ? "Submitting..." : "Change"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogChangeUsername