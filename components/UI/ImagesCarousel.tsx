"use client";
import Image from "next/image";
import { useMemo } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { env } from "@/lib/env";
import type { FileType } from "@/lib/types";
import type { Thumb } from "./ImageShow";

export const ImagesCarousel = ({
  images,
  mainImageUrl,
  mainImageName,
}: {
  images: FileType[];
  mainImageUrl: string;
  mainImageName: string;
}) => {
  const mainImage = useMemo<Thumb>(
    () => ({ id: "main", name: mainImageName, url: mainImageUrl }),
    [mainImageName, mainImageUrl],
  );

  const allImages = useMemo<Thumb[]>(
    () => [...images, mainImage],
    [images, mainImage],
  );
  return (
    <Swiper
      autoHeight
      modules={[Navigation, Pagination, Autoplay]}
      centeredSlides={true}
      spaceBetween={50}
      breakpoints={{
        0: { slidesPerView: 1 },
        900: { slidesPerView: 3 },
      }}
      loop
      navigation
      pagination={{ clickable: true }}
    >
      {allImages?.map((item) => (
        <SwiperSlide key={item?.id}>
          <Image
            key={item.id}
            width={300}
            height={300}
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
