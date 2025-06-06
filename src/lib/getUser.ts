import { TypeUser } from "@/types/user"
import toast from "react-hot-toast"

export const getUser = async ()  : Promise<TypeUser | null>  =>  {
    try {
        const res = await fetch("/api/user")
        const { currUser } = await res.json()
        if(!res.ok) throw new Error("Gagal mendapat data user")
        return currUser

    } catch (error) {
        console.log("Error : " , error)
        toast.error("Gagal mengambil data user")
        return null
    }
}