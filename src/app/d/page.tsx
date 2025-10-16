"use client"

import { useProductsQuery } from "@/api/productApi"

const DPage = () => {

    const { data, isPending, isError, error } = useProductsQuery({
      queries : ""
    })

    if(isPending) return <p>Loading...</p>
    if(isError) return <p>Error : {error.message}</p>

    console.log(data)
  return (
    <div>
    </div>
  )
}

export default DPage