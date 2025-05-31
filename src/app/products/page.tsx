"use client";

import { useEffect, useState } from "react";
import ListProducts from "@/components/products/ListProducts";
import Navigasi from "@/components/products/Navigasi";
import useCategory from "../../zustand/useCategory";
import useProducts from "../../zustand/useProducts";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/products/Pagination";


const ProductsPage = () => {

  const searchParams = useSearchParams()  
  const currentCategory = searchParams.get("category")
  const pageQuery = Number(searchParams.get("page"))

  const { products, setProducts } = useProducts();

  const [page, setPage] = useState<number>(Number(pageQuery) || 1)

  const { userCategory } = useCategory();

  const [categoryList, setCategoryList] = useState<string[]>([])

  const params = new URLSearchParams(searchParams.toString())
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if(currentCategory) params.set("category", currentCategory)
        if(pageQuery) params.set("page", page + "")
        const response = await fetch(`/api/products?${params.toString()}`);
        if(!response.ok) throw new Error("Something went wrong!")
        const { products, category } = await response.json();
        setCategoryList(category)
        setProducts(products);
      } catch (error) {
        console.error({ error })
      }
    };
    fetchProducts();
  }, [setProducts, userCategory, currentCategory, pageQuery, page]);

  return (
    <div className="flex lg:w-[95vw] mx-auto lg:pb-20 lg:mt-5">
      <Navigasi categorys={categoryList} params={params}/>
      <div>
        <ListProducts products={products} />
        {!!products.length && <Pagination page={page} setPage={setPage} maxPage={5} params={params}/>}
      </div>
    </div>
  );
};

export default ProductsPage;
