"use client"

import dynamic from "next/dynamic"
const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr : false
})


const ClientMapPage = () => {
  return (
    <div className="min-h-screen pt-5 px-5">
      {/* <Map /> */}
      <DeliveryMap />
    </div>
  )
}

export default ClientMapPage