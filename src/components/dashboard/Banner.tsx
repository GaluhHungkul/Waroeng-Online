"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const bannerImg:string[] = ["/assets/img/banner1.jpg","/assets/img/banner2.jpg","/assets/img/banner3.jpg",]

const Banner = () => {   

  return (
    <div className="lg:w-[90vw] lg:mt-10 mx-auto  rounded relative">
      <button id="prev" className="absolute lg:-left-10 z-[1000] bg-white  top-1/2 -translate-y-1/2 lg:p-1 rounded-full hover:bg-gray-200 active:bg-gray-400"><ArrowLeft color="black" /></button>
      <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={100}
      pagination={{ clickable : true }}
      loop
      navigation={{
        prevEl : "#prev",
        nextEl : "#next"
      }}
      autoplay={{ delay : 3000, disableOnInteraction : false }}
      speed={800}
      >
        {bannerImg.map((banner, index) => (
          <SwiperSlide key={index}>
            <div style={{ backgroundImage : `url(${banner})`}} className=" rounded  bg-cover bg-center lg:w-full lg:h-96 " >

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        <button id="next" className="absolute lg:-right-10 z-10 bg-white  top-1/2 -translate-y-1/2 lg:p-1 rounded-full hover:bg-gray-200 active:bg-gray-400"><ArrowRight color="black" /></button>
    </div>
  )
}

export default Banner