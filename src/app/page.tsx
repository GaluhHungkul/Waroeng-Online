import Banner from "@/components/dashboard/Banner";
import ListProducts from "@/components/common/ListProducts";

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

export default async function Home() {
  const { products } = await getProducts();

  return (
    <div className="min-h-screen h-max backdrop-blur-md lg:mx-16 ">
      <Banner />
      <h1 className="lg:mt-10  lg:text-2xl font-bold text-black lg:mb-4">
        Rekomendasi Product
      </h1>
      <ListProducts products={products} />
    </div>
  );
}
