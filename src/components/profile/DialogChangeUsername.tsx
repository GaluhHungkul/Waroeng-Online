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
import { FormEvent, useState } from "react"

const DialogChangeUsername = () => {

    const [open, setOpen] = useState(false)
    const [newUsername, setNewUsername] = useState("")

  const handleChangeUsername = async (e:FormEvent) => {
    try {
        e.preventDefault()
        if(newUsername.trim() === "") return
    } catch (error) {
        console.log("Error : " , error)
    }
    setOpen(false)
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
                <Input onChange={(e) => setNewUsername(e.target.value)} />
            </div>
            <Button className="w-full">Change</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogChangeUsername