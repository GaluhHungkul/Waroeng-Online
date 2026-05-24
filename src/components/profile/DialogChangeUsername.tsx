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
import { useState } from "react"
import { toast } from "sonner"

const DialogChangeUsername = () => {

  const session = useSession()  

  const [open, setOpen] = useState(false)
  const [newUsername, setNewUsername] = useState("")
  const [loadingChangeUsername, setLoadingChangeUsername] = useState(false)

  const handleChangeUsername = async () => {
    try {
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
        <div>
            <div className="w-full mb-6 mt-4">
                <Label htmlFor="link" className="sr-only">
                Link
                </Label>
                <Input placeholder="Masukkan minimal 8 karakter dan maksimal 24" required onChange={(e) => setNewUsername(e.target.value)} />
            </div>
            <Button onClick={() => {
              if(newUsername.trim() === "" || newUsername.trim().length < 8 || newUsername.trim().length > 24) toast.warning("Minimal 8 karakter")
              else handleChangeUsername()
            }} disabled={loadingChangeUsername} className="w-full">{loadingChangeUsername ? "Submitting..." : "Change"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogChangeUsername