"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import * as React from "react";

export function ZoomOnHoverImage({
  src,
  alt,
  scale = 2.5,
  width,
  height,
  sizes = "(max-width: 600px) 100vw, 400px",
  priority = false, // ← new prop
}: {
  src: string;
  alt: string;
  scale?: number;
  width?: number;
  height?: number;
  sizes?: string;

  priority?: boolean;
}) {
  const [zoom, setZoom] = React.useState(false);
  const [origin, setOrigin] = React.useState("50% 50%");

  const update = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
    );
  };

  return (
    <Box
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setZoom(true);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") {
          setZoom(true);
          update(e);
        }
      }}
      onPointerMove={update}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") setZoom(false);
      }}
      onPointerLeave={() => setZoom(false)}
      onPointerCancel={() => setZoom(false)}
      sx={{
        width,
        height,
        position: "relative",
        aspectRatio: "1",
        overflow: "hidden",
        borderRadius: 2,
        cursor: "zoom-in",
        touchAction: "none",
      }}
    >
      <Image
        priority={priority}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        draggable={false}
        style={{
          objectFit: "cover",
          transformOrigin: origin,
          transform: zoom ? `scale(${scale})` : "none",
          transition: "transform .15s ease-out",
        }}
      />
    </Box>
  );
}
