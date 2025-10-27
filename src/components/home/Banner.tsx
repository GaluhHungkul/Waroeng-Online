"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay,  Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const bannerImg = [
  {
    id: 92,
    src: "/assets/img/1.webp",
    title: "Hurry up, only a few left!",
    content: "Get the latest arrivals before they’re gone.",
    cta: "Shop Now",
    secondaryCta: "Explore Deals"
  },
  {
    id: 95,
    src: "/assets/img/2.webp",
    title: "New Season, New Style",
    content: "Discover trendy collections for your everyday comfort.",
    cta: "Buy Now",
    secondaryCta: "Show More"
  },
  {
    id: 78,
    src: "/assets/img/3.webp",
    title: "Flash Sale Is Live!",
    content: "Limited-time discounts on best-selling products.",
    cta: "Order Now",
    secondaryCta: "Learn More"
  }
]


const Banner = () => {   

  return (
    <div className="mt-5 lg:mt-10 relative">
      <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={40}
      pagination={{ 
        clickable : true,
        el : ".pagination"
      }}
      loop
      autoplay={{ delay : 3000, disableOnInteraction : false }}
      speed={800}
      className="rounded"
      >
        {bannerImg.map(({ src, id, title, content, cta, secondaryCta }) => (
          <SwiperSlide key={id} className="bg-gray-300 p-4 rounded pb-10 !flex flex-col md:flex-row items-center">
            <div  className="overflow-hidden bg-cover bg-center rounded relative aspect-[1/1] w-2/3 md:w-1/2 lg:h-80">
              <Image src={src} alt="Banner" fill sizes="100vw" className="object-center object-cover" /> 
            </div>
            <div> 
              <section className="font-bold mb-6">
              <h1 style={{ color : "#ff6b00" }} className="font-semibold mb-4 lg:text-2xl">{title}</h1>
              <p className="text-gray-800 text-2xl lg:text-4xl">{content}</p>
            </section>
            <section className="font-semibold flex gap-8">
              <Link href={`/products/detail/${id}`} style={{ background : "#ff6b00" }} className=" rounded-full px-8 py-3 text-white">{cta}</Link>
              <Link href={`/products/detail/${id}`} className="flex group items-center text-gray-700 gap-2">{secondaryCta} <ArrowRight className="group-hover:translate-x-4 duration-200" /></Link>
            </section>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pagination justify-center mt-4 z-10 flex items-center gap-4"></div>
    </div>
  )
}

export default Banner