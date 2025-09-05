"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchProducts = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim().length) router.replace("/products");
    router.replace(`/products?search=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 text-[12px] w-max items-stretch lg:w-full justify-center h-2/3 ">
      <input
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded px-2 w-2/3 lg:px-4  lg:py-1 focus:outline-none lg:text-lg"
      />
      <button className="bg-white font-bold px-2 lg:px-4 lg:py-1 rounded lg:text-lg hover:bg-white/70 active:bg-white/50 ">
        Search
      </button>
    </form>
  );
};

export default SearchProducts;
