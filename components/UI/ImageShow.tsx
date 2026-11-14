"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
import { env } from "@/lib/env";
import type { FileType } from "@/lib/types";

export type Thumb = Pick<FileType, "id" | "name" | "url">;

export const ImageShow = ({
  mainImageUrl,
  mainImageName,
  images,
}: {
  mainImageUrl: string;
  mainImageName: string;
  images: FileType[];
}) => {
  const mainImage = useMemo<Thumb>(
    () => ({ id: "main", name: mainImageName, url: mainImageUrl }),
    [mainImageName, mainImageUrl],
  );

  const allImages = useMemo<Thumb[]>(
    () => [...images, mainImage],
    [images, mainImage],
  );

  const [showingImage, setShowingImage] = useState<Thumb>(mainImage);

  return (
    <div>
      <Image
        width={400}
        height={400}
        style={{
          borderColor: "#EEE",
          borderWidth: "1px",
          borderRadius: "1rem",
          aspectRatio: 1,
        }}
        alt={showingImage.name}
        src={`${env.NEXT_PUBLIC_BASE_URL}/${showingImage.url}`}
      />
      <Box id="images" sx={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {allImages
          .filter((i) => i.url !== showingImage.url)
          .map((f) => (
            <Image
              key={f.id}
              onClick={() => setShowingImage(f)}
              width={70}
              height={70}
              style={{
                maxWidth: "6rem",
                borderColor: "#EEE",
                borderWidth: "1px",
                borderRadius: "0.5rem",
                aspectRatio: 1,
              }}
              alt={f.name}
              src={`${env.NEXT_PUBLIC_BASE_URL}/${f.url}`}
            />
          ))}
      </Box>
    </div>
  );
};
