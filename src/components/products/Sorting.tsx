"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation";


const options = [
  { value: "price,desc", label: "Dari harga tertinggi" },
  { value: "price,asc", label: "Dari harga terendah" },
  { value: "rating,desc", label: "Dari rating tertinggi" },
  { value: "rating,asc", label: "Dari rating terendah" },
];

const Sorting = ({ params } : { params : URLSearchParams }) => {

  const router = useRouter()
  const pathname = usePathname()

  const handleSort = async (val:string) => {
    const [sortBy, order] = val.split(",")
    params.set("sortBy", sortBy)
    params.set("order", order)
    router.push(`${pathname}?${params.toString()}` , { scroll : true })
  }

  return (
    <Select onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Sorting;
