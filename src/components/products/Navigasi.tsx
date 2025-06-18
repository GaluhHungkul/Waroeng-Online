import useCategory from "@/zustand/useCategory";
import Sorting from "./Sorting";
import { useRouter } from "next/navigation";


interface PropsNavigasi {
  categorys: string[];
  params : URLSearchParams;
  loadingFetchData : boolean;
}

const Navigasi = ({categorys, params, loadingFetchData}: PropsNavigasi) => {

  const { userCategory } = useCategory();

  const router = useRouter()

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

  return (
    <div className="text-white py-4 order-1 lg:order-3 lg:w-1/3 lg:sticky lg:top-28 lg:min-h-40 bg-black/70 lg:max-h-[80vh] lg:rounded  gap-5 flex flex-col items-center lg:gap-10 lg:pt-10">
      <Sorting />
      <div className="flex flex-wrap gap-2 lg:gap-4 w-4/5 mx-auto">
        {categorys.map((el, index) => (
          <button
            key={index}
            disabled={loadingFetchData}
            onClick={() => handleCategory(el)}
            className={`${userCategory.includes(el) ? "bg-black text-white" : "bg-white text-black"} text-[10px] font-bold px-3 py-1 lg:px-5 lg:py-3 rounded-full hover:bg-white/50 border-2 active:bg-white/70 disabled:bg-gray-400 disabled:text-white lg:text-[15px] `}>
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigasi;