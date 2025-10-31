import ListProducts from "@/components/common/ListProducts";
import Banner from "@/components/dashboard/Banner";
import FeaturedProductCategory from "@/components/dashboard/FeaturedProductCategory";
import Subscribe from "@/components/dashboard/Subscribe";

export default async function Home() {  

  return (
    <div className="mx-4 md:w-4/5 md:mx-auto pb-10">
      <Banner />
      <h1 className="my-5 lg:mt-10 text-xl  lg:text-2xl font-bold text-gray-700 lg:mb-4">Popular Products</h1>
      <ListProducts queryKey="popular_products" similar queries="sortBy=rating&order=desc&select=title,category,thumbnail,price,rating,stock,description"/>
      <FeaturedProductCategory />
      <Subscribe />
    </div>
  );
}
