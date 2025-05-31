import useCategory from "@/zustand/useCategory";
import Sorting from "./Sorting";
import { useRouter } from "next/navigation";
import Input from "../tags/Input";
import BackgroundAnimation from "../BackgroundAnimation";

interface PropsNavigasi {
  categorys: string[];
  params : URLSearchParams
}

const Navigasi = ({categorys, params}: PropsNavigasi) => {

  const { userCategory } = useCategory();

  const router = useRouter()

  const handleCategory = (value: string) => {
    useCategory.getState().setCategory(value)
    if(!useCategory.getState().userCategory.length) {
      params.delete("category")
      router.replace(`/products?${params.toString()}`)
    } else {
      params.set("category", useCategory.getState().userCategory.join())
      router.replace(`/products?${params.toString()}`)
    }
  };

  const handleSearch = async () => {

  }

  return (
    <div className="text-white lg:flex-1  sticky lg:top-28 lg:min-h-40 lg:max-h-[80vh] rounded-xl bg-secondary flex flex-col items-center lg:gap-10 lg:pt-10  ">
      <BackgroundAnimation />
      <form className=" flex items-center gap-2 text-sm w-4/5"  onSubmit={handleSearch}>
        <Input
          label="Cari Product"
          id="product"
          type="text"
          />
        <button className="bg-primary text-secondary h-full font-bold px-6 py-3 rounded hover:bg-primary/50 active:bg-primary/30">
          Cari!
        </button>
      </form>

      <Sorting />
      <div className="flex flex-wrap lg:gap-4 w-[83%] mx-auto">
        {categorys.map((el, index) => (
          <button
            onClick={() => handleCategory(el)}
            className={`${
              userCategory.includes(el) ? "bg-secondary text-primary  border-primary" : "bg-primary text-secondary "
            } text-[7px] px-2 py-3 rounded-full hover:bg-primary/80 border-2 active:bg-primary/60 lg:text-[15px] `}
            key={index}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigasi;