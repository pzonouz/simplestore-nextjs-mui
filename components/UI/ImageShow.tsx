"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
import { env } from "@/lib/env";
import type { FileType } from "@/lib/types";

export type Thumb = Pick<FileType, "id" | "name" | "url">;

const getSrc = (url: string) => {
  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) return url;
  const base = env.NEXT_PUBLIC_BASE_URL.replace(/\/+$/, "");
  return `${base}/${url.replace(/^\/+/, "")}`;
};

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

  // Dedupe by id; the main image always wins.
  const allImages = useMemo<Thumb[]>(() => {
    const byId = new Map<string, Thumb>();
    for (const img of images) byId.set(img.id, img);
    byId.set(mainImage.id, mainImage);
    return Array.from(byId.values());
  }, [images, mainImage]);

  // Track id, not object — derived state can never go stale.
  const [showingId, setShowingId] = useState(mainImage.id);
  const showingImage = allImages.find((i) => i.id === showingId) ?? mainImage;

  const thumbs = allImages.filter((i) => i.id !== showingImage.id);

  return (
    <Box
      sx={{
        border: "1px solid #EEE",
        display: "flex",
        flexDirection: "column",
        width: 1,
        aspectRatio: 1,
        borderRadius: { xs: 0, md: 2 },
        overflow: "hidden",
      }}
    >
      {/* Main image: its own positioned, sized box — `fill` stays inside it. */}
      <Box sx={{ position: "relative", flex: 1, minHeight: 0, m: 1 }}>
        <Image
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          alt={showingImage.name}
          src={getSrc(showingImage.url)}
          style={{ objectFit: "cover", borderRadius: "0.5rem" }}
        />
      </Box>

      {/* Thumbnails: real buttons, so they're focusable and keyboard-usable. */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 1,
          overflowX: "auto",
          alignItems: "center",
        }}
      >
        {thumbs.map((f) => (
          <Box
            key={f.id}
            component="button"
            type="button"
            onClick={() => setShowingId(f.id)}
            aria-label={`Show ${f.name}`}
            sx={{
              position: "relative",
              flex: "0 0 auto",
              width: 70,
              height: 70,
              p: 0,
              border: "1px solid #EEE",
              borderRadius: "0.5rem",
              overflow: "hidden",
              background: "none",
              cursor: "pointer",
            }}
          >
            <Image
              fill
              sizes="70px"
              alt={f.name}
              src={getSrc(f.url)}
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
