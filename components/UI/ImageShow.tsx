"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import { env } from "@/lib/env";
import type { FileType } from "@/lib/types";

export const ImageShow = ({
  mainImageUrl,
  mainImageName,
  images,
}: {
  mainImageUrl: string;
  mainImageName: string;
  images: FileType[];
}) => {
  const allImages = [...images, { name: mainImageName, url: mainImageUrl }];
  const [showingImage, setShowingImage] = useState<{
    name: string;
    url: string;
    id: string;
  }>({ name: mainImageName, url: mainImageUrl, id: "1" });

  return (
    <div>
      {/** biome-ignore lint/performance/noImgElement: "" */}
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
            // biome-ignore lint/performance/noImgElement: ""
            // biome-ignore lint/a11y/useKeyWithClickEvents: ""
            <img
              key={f.id}
              onClick={() =>
                setShowingImage({ name: f.name, url: f.url, id: f.id })
              }
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
