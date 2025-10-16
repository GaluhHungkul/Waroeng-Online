import SwiperListProduct from "@/components/dashboard/SwiperListProduct";

export default async function Home() {  

  return (
    <div className="min-h-screen h-max mx-4 lg:mx-16 ">
      <SwiperListProduct title="Featured Products" queryKey="featured" queries="sortBy=rating&order=desc&select=title,category,thumbnail,price,rating,stock"/>
      <SwiperListProduct title="Popular Products" queryKey="popular" queries="sortBy=rating&order=desc&skip=20&select=title,category,thumbnail,price,rating,stock"/>
    </div>
  );
}
