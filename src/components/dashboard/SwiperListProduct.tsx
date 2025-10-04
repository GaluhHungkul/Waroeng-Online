"use client"

import { useProductsQuery } from "@/lib/getProducts"

import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "../common/ProductCard";
import SkeletonSwiperListProduct from "../skeleton/SkeletonSwiperListProduct";

const SwiperListProduct = ({ title, endpoint, queries } : { title : string, endpoint? : string, queries? : string }) => {

    const { data, isPending } = useProductsQuery({
        queryKey : title,
        endpoint, queries
    })    

    if(isPending) return <SkeletonSwiperListProduct />

  return (
    <div className="pt-5">
        <h1 className="mb-5 lg:mt-10 text-xl  lg:text-2xl font-bold text-black lg:mb-4">{title}</h1>
        <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        pagination={{ clickable : true }}
        loop
        breakpoints={{
            640 : {
                slidesPerView : 3 
            },
            1024: {
                slidesPerView : 5
            }
        }}
        autoplay={{ delay : 1000, disableOnInteraction : false }}
        speed={800}
        >
            {data?.products.map((product) => (
            <SwiperSlide key={product._id} className="mb-10 lg:mb-14">
                <ProductCard product={product}/>
            </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}

export default SwiperListProduct