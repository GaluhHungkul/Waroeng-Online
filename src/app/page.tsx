import Banner from "@/components/dashboard/Banner";
import ListProducts from "@/components/common/ListProducts";
import { Metadata } from "next";

const getProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_BASE_API_URL}/products?random=true`
    );
    return await res.json();
  } catch (error) {
    console.log("Error : ", error);
    return [];
  }
};

export const metadata : Metadata = {
  title : "Waroeng Online"
}

export default async function Home() {

  
  const { products=[] } = await getProducts();

  return (
    <div className="min-h-screen h-max mx-4 lg:mx-16 ">
      <Banner />
      <h1 className="mt-5 lg:mt-10 text-xl  lg:text-2xl font-bold text-black lg:mb-4">
        Rekomendasi Product
      </h1>
      <ListProducts products={products} />
    </div>
  );
}
