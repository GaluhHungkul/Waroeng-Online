import useCategory from "@/zustand/useCategory";
import Sorting from "./Sorting";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../tags/Input";
import { FormEvent, useEffect, useState } from "react";

interface PropsNavigasi {
  categorys: string[];
  params : URLSearchParams;
  loadingFetchData : boolean;
}

const Navigasi = ({categorys, params, loadingFetchData}: PropsNavigasi) => {

  const { userCategory } = useCategory();

  const searchParams = useSearchParams()

  const router = useRouter()

  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    setSearch(searchParams.get("search") || "")
  },[searchParams])

  const handleCategory = (value: string) => {
    useCategory.getState().setCategory(value)
    params.delete("page")
    if(!useCategory.getState().userCategory.length) {
      params.delete("category")
      router.replace(`/products?${params.toString()}`)
    } else {
      params.set("category", useCategory.getState().userCategory.join())
      router.replace(`/products?${params.toString()}`)
    }
  };

  const handleSearch = async (e:FormEvent) => {
    e.preventDefault()
    if(!search.trim().length) return
    router.replace(`/products?search=${search}`)
  }

  return (
    <div className="text-white lg:w-1/3 sticky lg:top-28 lg:min-h-40 bg-black/80 lg:max-h-[80vh] rounded-xl overflow-hidden  flex flex-col items-center lg:gap-10 lg:pt-10  ">
      <form className=" flex items-center gap-2 text-sm w-4/5"  onSubmit={handleSearch}>
        <Input
          label="Cari Product"
          id="product"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        <button className="bg-white text-black h-full font-bold px-6 py-3 rounded hover:bg-white/50 active:bg-white/30">
          Cari!
        </button>
      </form>
      <Sorting />
      <div className="flex flex-wrap lg:gap-4 w-[83%] mx-auto">
        {categorys.map((el, index) => (
          <button
            key={index}
            disabled={loadingFetchData}
            onClick={() => handleCategory(el)}
            className={`${userCategory.includes(el) ? "bg-black text-white" : "bg-white text-black"} text-[7px] font-bold px-5 py-3 rounded-full hover:bg-white/50 border-2 active:bg-white/70 disabled:bg-gray-400 disabled:text-white lg:text-[15px] `}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigasi;