"use client";
import * as React from "react";
import { Box } from "@mui/material";

export function ZoomOnHoverImage({
  src,
  alt,
  scale = 2.5,
  width,
  height,
}: {
  src: string;
  alt: string;
  scale?: number;
  width?: number;
  height?: number;
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
        width: width,
        height: height,
        position: "relative",
        aspectRatio: "1",
        overflow: "hidden",
        borderRadius: 2,
        cursor: "zoom-in",
        touchAction: "none",
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: origin,
          transform: zoom ? `scale(${scale})` : "none",
          transition: "transform .15s ease-out",
        }}
      />
    </Box>
  );
}
