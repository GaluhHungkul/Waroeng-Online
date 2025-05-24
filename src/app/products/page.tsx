"use client";

import { useEffect } from "react";
import ListProducts from "../Components/products/ListProducts";
import Navigasi from "../Components/products/Navigasi";
import useCategory from "../../zustand/useCategory";
import useProducts from "../../zustand/useProducts";

const ProductsPage: React.FC = () => {
  const { products, setProducts } = useProducts();

  const { userCategory } = useCategory();

  const categorys: string[] = ["Electronics", "Office Supplie", "Fashion"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let api = "/api/products"
        if(userCategory.length) {
          api += `?category=${encodeURIComponent(userCategory.join())}`
        }
        console.log({api})
        const response = await fetch(api);
        if(!response.ok) throw new Error("Something went wrong!")
        const result = await response.json();
        console.log({result})
        setProducts(result);
      } catch (error) {
        console.error({error})
      }
    };
    fetchProducts();
  }, [setProducts, userCategory]);

  return (
    <div>
      <Navigasi categorys={categorys} />
      <ListProducts products={products} />
    </div>
  );
};

export default ProductsPage;
