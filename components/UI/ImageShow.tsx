"use client";
import { Box } from "@mui/material";
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
      {/* biome-ignore lint/performance/noImgElement: hero image, fixed dimensions */}
      <img
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
            // biome-ignore lint/a11y/useKeyWithClickEvents: ""
            // biome-ignore lint/performance/noImgElement: ""
            <img
              key={f.id}
              // biome-ignore lint/a11y/useKeyWithClickEvents: thumbnail gallery
              // biome-ignore lint/performance/noImgElement: thumbnail, fixed size
              onClick={() => setShowingImage(f)}
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
