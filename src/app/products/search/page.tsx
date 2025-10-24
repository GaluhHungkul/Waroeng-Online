import ClientSearchProductsPage from "@/components/searchProductsPage/ClientSearchProductsPage"

export async function generateMetadata(props : { 
  searchParams : Promise<{ [key:string] : string | string[] | undefined }>
}) {
  
  const query = await props.searchParams

  return {
    title : `All "${query.q}" products`,
    description : `Semua product dengan pencarian ${query.q}`
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