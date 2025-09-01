"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay,  Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";

const bannerImg:string[] = ["/assets/img/banner1.webp","/assets/img/banner2.webp","/assets/img/banner3.webp",]

const Banner = () => {   

  return (
    <div className="mt-5 lg:mt-10">
      <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={100}
      pagination={{ clickable : true }}
      loop
      autoplay={{ delay : 3000, disableOnInteraction : false }}
      speed={800}
      className="rounded"
      >
        {bannerImg.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-hidden rounded relative aspect-[5/2]" >
              <Image src={banner} alt="Banner" fill sizes="100vw" className="object-center object-cover"/> 
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Banner