import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/tags/Input";
import toast from "react-hot-toast";

const schemaChangeUser = z.object({
  oldPassword : z.string().min(8),
  newUsername : z.string().min(8),
  newPassword : z.string().min(8)
})

type SchemaNewUser = z.infer<typeof schemaChangeUser>


const AccountSetting = () => {   

  const { register, handleSubmit, formState : { errors }, reset } = useForm({
    resolver : zodResolver(schemaChangeUser)
  })

  const [loadingSubmitNewData, setLoadingSubmitNewData] = useState<boolean>(false);

  const myHandleSubmit = async (values:SchemaNewUser) => { 

    setLoadingSubmitNewData(true);

    try {
      const res = await fetch("/api/user/changedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await res.json()
      if(!result.ok) toast.error(result.message)
      else toast.success("Data anda berhasil diupdatre")
    } catch (error) {
        console.log("error : " + error);
    }
    setLoadingSubmitNewData(false);
    reset()
  };
  return (
    <div className=" my-10 min-h-80 border mx-5 transition-all duration-300 rounded-xl border-gray-700 hover:shadow-md hover:shadow-gray-700 ">
        <h1 className="font-bold  text-xl text-black lg:text-3xl lg:mt-8 lg:ml-20">Account Control</h1>          
        <form onSubmit={handleSubmit(myHandleSubmit)} className="flex flex-col min-h-64 my-10 relative lg:px-20">
          <div className="flex justify-between items-center mx-2  mt-5 lg:mx-0">
            <p className="text-sm text-gray-700 font-semibold lg:text-xl">
               Username Baru
            </p>
            <div className="lg:w-1/3 relative lg:mb-4">
            <Input required type="text" id="newUsername" label="Username baru" {...register("newUsername")} />
            <span className="text-red-700 absolute">{errors.newUsername?.message}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mx-2  mt-5 lg:mx-0">
            <p className="text-sm text-gray-700 font-semibold lg:text-xl">
               Password Baru
            </p>
            <div className="lg:w-1/3 relative lg:mb-4">
            <Input required type="password" id="newPassword" label="Password baru" {...register("newPassword")} />
            <span className="text-red-700 absolute">{errors.newPassword?.message}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mx-2  mt-5 lg:mx-0">
            <p className="text-sm text-gray-700 font-semibold lg:text-xl">
                Verifikasi password sebelumnya
            </p>
            <div className="lg:w-1/3 relative lg:mb-4">
            <Input required type="password" id="oldPassword" label="Password lama" {...register("oldPassword")} />   
            <span className="text-red-700 absolute">{errors.oldPassword?.message}</span>
            </div>
          </div>
          <button disabled={loadingSubmitNewData} type="submit" className="relative lg:min-w-28  bg-black text-white hover:bg-black/70 active:bg-black/50 disabled:bg-black/50  px-4 py-1 rounded font-bold ml-auto lg:px-8 lg:py-2 lg:mt-10" >
            {loadingSubmitNewData ? <div className="lg:size-6  border-r-2 border-l-2 mx-auto rounded-full animate-spin"></div> : "SUBMIT"}
          </button>
        </form>
      </div>
  )
}

export default AccountSetting 