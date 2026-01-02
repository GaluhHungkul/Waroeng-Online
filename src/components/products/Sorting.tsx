"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const optionsProductSort = [
  { value: "price,desc", label: "Dari harga tertinggi" },
  { value: "price,asc", label: "Dari harga terendah" },
  { value: "rating,desc", label: "Dari rating tertinggi" },
  { value: "rating,asc", label: "Dari rating terendah" },
];

const optionsOrderSort = [
  { value: "unpaid", label: "Unpaid" },
  { value: "paid", label: "Paid" },
];

const Sorting = ({ orders=false } : { orders?: boolean }) => {

  const router = useRouter()
  const pathname = usePathname()

  const data = orders ? optionsOrderSort : optionsProductSort

  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())

  const handleSort = async (val:string) => {
    if(!orders) {
      const [sortBy, order] = val.split(",")
      params.set("sortBy", sortBy)
      params.set("order", order)
    } else {
      params.set("sortBy", val)
    }
     
    router.push(`${pathname}?${params.toString()}` , { scroll : true })
  }

  return (
    <Select onValueChange={handleSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Sorting;
