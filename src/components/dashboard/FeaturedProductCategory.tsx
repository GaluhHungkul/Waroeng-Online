import { featuredCategoryData } from "@/lib/featuredCategoryData";
import FeaturedCategoryCard from "./FeaturedCategoryCard";

const FeaturedProductCategory = () => {
  return (
    <section className=" mx-auto  py-16">
      <h1 className='text-center font-bold mb-10 relative before:absolute text-gray-700  before:-bottom-2 before:w-1/3 before:right-1/2 before:h-1 before:bg-primary-orange before:translate-x-1/2 before:rounded-full text-2xl md:before md:text-4xl md:mb-20 md:before:-bottom-4 lg:before:w-1/5'>Featured <span className='text-primary-orange'>Products</span></h1>
      <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-12">
        {featuredCategoryData.map((item) => 
          <FeaturedCategoryCard key={item.id} item={item}/>
        )}
      </div>
    </section>
  );
}

export default FeaturedProductCategory