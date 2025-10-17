import Sorting from "./Sorting";
import SelectCategories from "./SelectCategories";


interface PropsNavigasi {
  categorys: string[];
  params : URLSearchParams;
}

const Navigasi = ({ params}: PropsNavigasi) => {


  return (
    <div className="text-white py-4 order-1 lg:order-3 lg:w-1/3 lg:sticky lg:top-28 lg:min-h-40  lg:max-h-[80vh] lg:rounded  gap-5 flex justify-between items-center lg:gap-10 lg:pt-10">
      <Sorting params={params} />
      <SelectCategories params={params}/>
    </div>
  );
};

export default Navigasi;