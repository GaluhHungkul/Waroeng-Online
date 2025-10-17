"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";


const categories = [
  "all",
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
]



const SelectCategories = ({ params } : { params : URLSearchParams }) => {

  const router = useRouter()
  
  
  const handleSelectCategory = async (category:string) => {
    params.forEach((_,key) => params.delete(key))
    params.set("category", category)
    router.push(`/products?category=${category}` , { scroll : true })
  }

  return (
    <Select onValueChange={handleSelectCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Search by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map(category => (
            <SelectItem key={category} value={category}>{category.replace("-", " ")}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectCategories