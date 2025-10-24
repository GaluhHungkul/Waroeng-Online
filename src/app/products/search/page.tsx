import ClientSearchProductsPage from "@/components/searchProductsPage/ClientSearchProductsPage"

export async function generateMetadata({ searchParams } : { 
  searchParams : { [key:string] : string | string[] | undefined }
}) {
  return {
    title : `All "${searchParams.q}" products`,
    description : `Semua product dengan pencarian ${searchParams.q}`
  }
}

const SearchProductsPage =  () => {


  return (
    <div className="lg:w-[90vw] p-4 md:p-8 mx-auto pb-14 lg:pb-32 lg:mt-5 relative lg:min-h-[80vh]">
      <ClientSearchProductsPage />
    </div>
  )
}

export default SearchProductsPage