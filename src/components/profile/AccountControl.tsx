import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/tags/Input";
import toast from "react-hot-toast";
import Title from "../common/Title";
import { useSession } from "next-auth/react";

const schemaChangeUser = z.object({
  newUsername : z.string().min(8),
})

type SchemaNewUser = z.infer<typeof schemaChangeUser>


const AccountControl = () => {   

  const { register, handleSubmit, formState : { errors }, reset } = useForm({
    resolver : zodResolver(schemaChangeUser)
  })

  const { update } = useSession()

  const [loadingSubmitNewData, setLoadingSubmitNewData] = useState<boolean>(false);

  const myHandleSubmit = async (values:SchemaNewUser) => { 

    setLoadingSubmitNewData(true);
    const loadingToast = toast.loading("Mengupdate data...")
    try {
      const res = await fetch("/api/user/changedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(!res.ok) {
        const { message } = await res.json()
        throw new Error(message)      
      } else toast.success("Data berhasil diupdate")
      await update()
    } catch (error) {
        let msg
        if (error instanceof Error) msg = error?.message;
        else msg = "Gagal mengupdate data";
        toast.error(msg)
    } finally {
      toast.dismiss(loadingToast)
      reset()
      setLoadingSubmitNewData(false);
    }
  };
  return (
    <div className="my-20 min-h-80 border mx-5 transition-all duration-300 rounded-xl border-gray-700 hover:shadow-md px-4 relative hover:shadow-gray-700 ">
        <Title className='!absolute -top-16 left-4'>Account Control</Title>
        <form onSubmit={handleSubmit(myHandleSubmit)} className="flex  flex-col min-h-64 my-10 relative lg:px-10">
          <div className="flex flex-col lg:justify-between lg:flex-row lg:items-center mx-2  mt-5 lg:mx-0">
            <p className="text-sm text-gray-700 font-semibold lg:text-xl">
              Username Baru
            </p>
            <div className="lg:w-2/5 relative lg:mb-4">
            <Input className="w-full" required type="text" id="newUsername" label="Username baru" {...register("newUsername")} />
            <span className="text-red-700 absolute text-[12px]">{errors.newUsername?.message}</span>
            </div>
          </div>
          <button disabled={loadingSubmitNewData} type="submit" className="mt-5 lg:min-w-28  bg-black text-white hover:bg-black/70 active:bg-black/50 disabled:bg-black/50  px-4 py-1 rounded font-bold ml-auto lg:px-8 lg:py-2 lg:mt-10" >
            {loadingSubmitNewData ? <div className="lg:size-6  border-r-2 border-l-2 mx-auto rounded-full animate-spin"></div> : "SUBMIT"}
          </button>
        </form>
      </div>
  )
}

export default AccountControl 