import ClientProductsPage from "@/components/products/ClientProductsPage";

const ProductsPage = () => {  

  return (
    <div className="flex flex-col lg:w-[90vw] mx-auto pb-14 lg:pb-32 lg:mt-5 relative lg:min-h-[80vh] lg:flex-row">
      <ClientProductsPage />
    </div>
  );
};

export default ProductsPage;
