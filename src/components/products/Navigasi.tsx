import Sorting from "./Sorting";
import SelectCategories from "./SelectCategories";
import SearchProducts from "../SearchProducts";


interface PropsNavigasi {
  params : URLSearchParams;
  searchProductsPage? : boolean
}

const Navigasi = ({ params, searchProductsPage=false }: PropsNavigasi) => {

  return (
    <div className="text-white  order-1 lg:order-3 lg:w-1/3 lg:sticky lg:top-28 lg:min-h-40  lg:max-h-[80vh] lg:rounded  gap-5  lg:gap-10 lg:pt-10">
      <SearchProducts searchProductsPage={searchProductsPage} params={params} />
      <section className="flex justify-between mt-4 mb-8 items-center gap-5">
        <Sorting params={params} />
        {!searchProductsPage && <SelectCategories params={params}/>}
      </section>
    </div>
  );
};

export default Navigasi;