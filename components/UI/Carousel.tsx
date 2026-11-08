"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/app/(admin)/admin/products/components/ProductCard";

export const Carousel = ({ items }: { items: Product[] }) => {
  return (
    <Swiper
      autoHeight
      modules={[Navigation, Pagination, Autoplay]}
      centeredSlides={true}
      spaceBetween={50}
      breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 3 } }}
      loop
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {items?.map((item) => (
        <SwiperSlide key={item?.id}>
          <ProductCard product={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
