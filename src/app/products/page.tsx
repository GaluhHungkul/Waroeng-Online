import ClientProductsPage from "@/components/products/ClientProductsPage";

export const metadata = {
  title : "Get all Products",
  description : "Lihat semua products"
}

const ProductsPage = () => {  

  return (
    <div className="p-4 md:p-8 mx-auto pb-14 lg:pb-32 lg:mt-5 relative lg:min-h-[80vh] lg:px-0 lg:w-4/5">      
      <ClientProductsPage />
    </div>
  );
};

export default ProductsPage;
