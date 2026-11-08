"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ProductCard } from "@/app/(admin)/admin/categories/components/ProductCard";
import type { Product } from "@/lib/types";

export const Carousel = ({ items }: { items: Product[] }) => {
  return (
    <Swiper
      autoHeight
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={3}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
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
