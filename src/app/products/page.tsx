"use client";

import { useEffect, useState } from "react";
import ListProducts from "@/components/common/ListProducts";
import Navigasi from "@/components/products/Navigasi";
import useCategory from "../../zustand/useCategory";
import useProducts from "../../zustand/useProducts";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/products/Pagination";
import SkeletonListProducts from "@/components/common/SkeletonListProducts";


const ProductsPage = () => {

  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const pageQuery = Number(searchParams.get("page"));
  const searchQuery = searchParams.get("search")

  const { products, setProducts } = useProducts();

  const [page, setPage] = useState<number>(1);
  const [loadingFetchData, setLoadingFetchData] = useState<boolean>(false)
  const [maxPage, setMaxPage] = useState<number>(1)

  const { setCategory } = useCategory();

  const [categoryList, setCategoryList] = useState<string[]>([]);

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if(pageQuery && !isNaN(pageQuery))  setPage(pageQuery)
    else setPage(1)
  },[pageQuery])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingFetchData(true)
        if (currentCategory) {
          params.set("category", currentCategory);
          setCategory(currentCategory.split(","))
        }
        if (pageQuery) params.set("page", page + "");
        const response = await fetch(`/api/products?${params.toString()}`);
        if (!response.ok) throw new Error("Something went wrong!");
        const { products, categories, maxPage } = await response.json();
        setCategoryList(categories);
        setProducts(products);
        setMaxPage(maxPage)
      } catch (error) {
        console.error({ error });
      } finally {
        setLoadingFetchData(false)
      }
      
    };
    fetchProducts();
  }, [setProducts,  currentCategory, pageQuery, page, searchQuery]);

  return (
    <div className="flex flex-col lg:w-[90vw] mx-auto pb-14 lg:pb-32 lg:mt-5 relative lg:min-h-[80vh] lg:flex-row">
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
        {!loadingFetchData && <Pagination page={page} loadingFetchData={loadingFetchData} setPage={setPage} maxPage={maxPage} params={params} />}
      </div>
    </div>
  );
};

export default ProductsPage;
