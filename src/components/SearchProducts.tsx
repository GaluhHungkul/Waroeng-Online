"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const SearchProducts = ({ params, searchProductsPage } : { params : URLSearchParams, searchProductsPage : boolean }) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim().length) router.push("/products");
    router.replace(`/products/search?q=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative bg-">
      <Input
        type="text"
        className="text-gray-700"
        placeholder="Search Products"
        defaultValue={!searchProductsPage ? "" : params.get("q") || "phone"}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 ">
        <Search color="#808080"/>
      </button>
        
    </form>
  );
};

export default SearchProducts;
