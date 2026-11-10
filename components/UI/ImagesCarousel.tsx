"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { env } from "@/lib/env";
import type { FileType } from "@/lib/types";

export const ImagesCarousel = ({ images }: { images: FileType[] }) => {
  return (
    <Swiper
      autoHeight
      modules={[Navigation, Pagination, Autoplay]}
      centeredSlides={true}
      spaceBetween={50}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
      }}
      loop
      navigation
      pagination={{ clickable: true }}
    >
      {images?.map((item: FileType) => (
        <SwiperSlide key={item?.id}>
          {/** biome-ignore lint/performance/noImgElement: "" */}
          <img
            key={item.id}
            style={{
              maxWidth: "100%",
              borderColor: "#EEE",
              borderWidth: "1px",
              borderRadius: "0.5rem",
              aspectRatio: 1,
            }}
            alt={item.name}
            src={`${env.NEXT_PUBLIC_BASE_URL}/${item.url}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
