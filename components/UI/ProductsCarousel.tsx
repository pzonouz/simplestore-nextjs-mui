"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "@/app/(admin)/admin/products/components/ProductCard";

import type { Product } from "@/lib/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const ProductCarousel = ({ items }: { items: Product[] }) => {
  return (
    <Swiper
      autoHeight
      modules={[Navigation, Pagination, Autoplay]}
      centeredSlides={true}
      lazyPreload={true}
      spaceBetween={50}
      breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 3 } }}
      loop
      navigation
      pagination={{ clickable: true }}
      style={{ position: "relative", zIndex: "-1" }}
    >
      {items?.map((item) => (
        <SwiperSlide key={item?.id}>
          <ProductCard product={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
