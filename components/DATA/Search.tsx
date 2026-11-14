"use client";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { env } from "@/lib/env";
import { useSearchProductsQuery } from "@/lib/redux/api";
import type { productSearchResult } from "@/lib/types";

export const Search = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, isLoading, isFetching } = useSearchProductsQuery(keyword, {
    skip: keyword.length < 3,
    refetchOnMountOrArgChange: true,
  });

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
        placeholder="برای جستجو حداقل سه حرف وارد کنید"
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
                <SearchIcon width={32} height={32} sx={{ fontSize: "2rem" }} />
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

      {keyword.length >= 3 && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            width: 1, // 100% of wrapper = same width as TextField
            zIndex: 50,
            backgroundColor: "white",
            paddingY: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {loading ? (
            // 1) Loading → skeleton, same width as the TextField
            <Box
              sx={{
                width: 1,
                display: "flex",
                alignItems: "center",
                p: "1rem",
                gap: "1rem",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={100}
                height={100}
                sx={{ borderRadius: "0.5rem" }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={24}
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
          ) : hasResults ? (
            // 2) Has results → render them
            data.map((item: productSearchResult) => (
              <Link
                onClick={() => {
                  setKeyword("");
                }}
                key={item._source.id}
                href={`/product/${item?._source?.slug}`}
                style={{
                  width: "100%",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    width: 1,
                    display: "flex",
                    alignItems: "center",
                    paddingY: "1rem",
                    gap: "1rem",
                    backgroundColor: "grey.200",
                  }}
                >
                  <Image
                    alt=""
                    width={100}
                    height={100}
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
