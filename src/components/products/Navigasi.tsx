import Sorting from "./Sorting";
import SelectCategories from "./SelectCategories";


interface PropsNavigasi {
  params : URLSearchParams;
  searchProductsPage? : boolean
}

const Navigasi = ({ params, searchProductsPage=false }: PropsNavigasi) => {

  return (
    <section className="flex justify-between mt-4 mb-8 items-center gap-5">
      <Sorting params={params} />
      {!searchProductsPage && <SelectCategories params={params}/>}
    </section>
  );
};

export default Navigasi;