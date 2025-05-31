"use client";

import { useState } from "react";
import useProducts from "@/zustand/useProducts";

interface OptionType {
  value: string;
  label: string;
}

const options: OptionType[] = [
  { value: "hargaTertinggi", label: "Dari harga tertinggi" },
  { value: "hargaTerrendah", label: "Dari harga terendah" },
  { value: "ratingTertinggi", label: "Dari rating tertinggi" },
  { value: "ratingTerrendah", label: "Dari rating terendah" },
];

const Sorting = () => {
  const { products, setProducts } = useProducts();
  const [userSorting, setUserSorting] = useState<OptionType | null>(null);

  const handleSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const selectedOption = options.find((option) => option.value === value);

    if (!selectedOption) return;

    const sortedProducts = [...products];

    switch (selectedOption.value) {
      case "hargaTertinggi":
        setProducts(sortedProducts.sort((a, b) => b.price - a.price));
        break;
      case "hargaTerrendah":
        setProducts(sortedProducts.sort((a, b) => a.price - b.price));
        break;
      case "ratingTertinggi":
        setProducts(sortedProducts.sort((a, b) => b.rate.value - a.rate.value));
        break;
      case "ratingTerrendah":
        setProducts(sortedProducts.sort((a, b) => a.rate.value - b.rate.value));
        break;
    }

    setUserSorting(selectedOption);
  };

  return (
    <select
      onChange={handleSorting}
      value={userSorting?.value || ""}
      className="rounded px-1 py-1 text-gray-400 font-semibold text-[12px] lg:text-base w-4/5 "
    >
      <option value="" disabled>
        Urutkan
      </option>
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Sorting;
