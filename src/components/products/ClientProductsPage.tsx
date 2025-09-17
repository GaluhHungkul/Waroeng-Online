"use client"

import useProducts from "@/zustand/useProducts";
import SkeletonListProducts from "../common/SkeletonListProducts"
import Navigasi from "./Navigasi"
import { useEffect, useState } from "react";
import useCategory from "@/zustand/useCategory";
import ListProducts from "../common/ListProducts";
import InfiniteScroll from "./InfiniteScroll";
import { useSearchParams } from "next/navigation";

const ClientProductsPage = () => {

    const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search")

  const { products, setProducts } = useProducts();

  const [loadingFetchData, setLoadingFetchData] = useState<boolean>(true)
  const [isNextPage, setIsNextPage] = useState<boolean>(false)

  const { setCategory } = useCategory();

  const [categoryList, setCategoryList] = useState<string[]>([]);

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingFetchData(true)
        if (currentCategory) {
          params.set("category", currentCategory);
          setCategory(currentCategory.split(","))
        }
        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) throw new Error("Something went wrong!");
        const { products, categories, isNextPage:nextPage } = await response.json();
        setCategoryList(categories);
        setProducts(products);
        setIsNextPage(nextPage)
      } catch (error) {
        console.error({ error });
      } finally {
        setLoadingFetchData(false)
      }
      
    };
    fetchProducts();
  }, [setProducts,  currentCategory, searchQuery]);

  return (
    <>
        <Navigasi categorys={categoryList} params={params} loadingFetchData={loadingFetchData}/>
        <div className="lg:mr-12 w-[95%] mx-auto min-h-screen lg:w-3/4 relative order-2">
            {loadingFetchData ?  <SkeletonListProducts /> 
            :
            <>
            {products.length ? <ListProducts products={products} /> 
            :
            <div className="text-center content-center font-bold text-2xl h-[50vh]">
                Products tidak tersedia
            </div>
            }
            </>
            }
            {!loadingFetchData && <InfiniteScroll params={params} isNextPage={isNextPage} setIsNextPage={setIsNextPage} />}
        </div>
    </>
  )
}

export default ClientProductsPage