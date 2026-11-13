"use client";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { env } from "@/lib/env";
import { useSearchProductsQuery } from "@/lib/redux/api";
import type { productSearchResult } from "@/lib/types";

export const Search = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, isLoading, isFetching } = useSearchProductsQuery(keyword, {
    skip: !keyword,
    refetchOnMountOrArgChange: true,
  });

  // `isLoading` = first load for this keyword; `isFetching` = any request
  // in flight (including refetch). Use whichever you want to drive the skeleton.
  const loading = isLoading || isFetching;
  const hasResults = !!data && data.length > 0;

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: "50%" },
      }}
    >
      <TextField
        fullWidth
        value={keyword}
        onChange={(e) => setKeyword(e.currentTarget.value)}
        sx={{
          backgroundColor: "grey.200",
          borderRadius: "8px",
        }}
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "2rem" }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "1rem",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
          },
        }}
      />

      {keyword && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width: 1, // 100% of wrapper = same width as TextField
            zIndex: 50,
            backgroundColor: "white",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {loading ? (
            // 1) Loading → skeleton, same width as the TextField
            <>
              <Skeleton
                variant="rounded"
                height={100}
                sx={{ width: 1, borderRadius: "1rem" }}
              />
              <Skeleton
                variant="rounded"
                height={100}
                sx={{ width: 1, borderRadius: "1rem" }}
              />
            </>
          ) : hasResults ? (
            // 2) Has results → render them
            data.map((item: productSearchResult) => (
              <Link
                onClick={() => {
                  setKeyword("");
                }}
                key={item._source.id}
                href={`/product/${item?._source?.slug}`}
              >
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: "grey.200",
                  }}
                >
                  {/** biome-ignore lint/a11y/useAltText: "" */}
                  {/** biome-ignore lint/performance/noImgElement: "" */}
                  <img
                    style={{ aspectRatio: 1, height: "4rem" }}
                    src={`${env.NEXT_PUBLIC_BASE_URL}/${item?._source.image_url}`}
                  />
                  <Typography id="results">{item._source.name}</Typography>
                </Box>
              </Link>
            ))
          ) : (
            // 3) Request finished, nothing returned → "Not found"
            <Typography key={"1"} sx={{ p: 2, color: "text.secondary" }}>
              موردی یافت نشد
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
