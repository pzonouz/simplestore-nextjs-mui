"use client";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { useGetSubCategoriesQuery } from "@/lib/redux/api";

export const SubCategorySelect = ({
  slug,
  selected = [],
  setSelected,
}: {
  slug: string;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}) => {
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery(slug, {
    skip: !slug,
  });

  return (
    subCategories &&
    subCategories?.length > 0 && (
      <Box
        sx={{
          my: "2rem",
          py: "2rem",
          px: "1rem",
          minWidth: "12rem",
          borderRadius: "8px",
          border: "2px solid",
          borderColor: "grey.200",
        }}
      >
        <Typography>دسته بندی ها</Typography>
        {isLoading ? (
          <Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton width={32} height={32} />
              <Skeleton sx={{ width: "75%" }} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton width={32} height={32} />
              <Skeleton sx={{ width: "75%" }} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton width={32} height={32} />
              <Skeleton sx={{ width: "75%" }} />
            </Box>
          </Box>
        ) : (
          <FormGroup>
            {subCategories?.map((c) => {
              const categorySlug = c.slug;
              if (!categorySlug) return null;

              return (
                <FormControlLabel
                  key={c.id}
                  control={
                    <Switch
                      checked={selected.includes(categorySlug)}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        setSelected((prev) =>
                          checked
                            ? prev.includes(categorySlug)
                              ? prev
                              : [...prev, categorySlug]
                            : prev.filter((i) => i !== categorySlug),
                        );
                      }}
                    />
                  }
                  label={c.name}
                />
              );
            })}
          </FormGroup>
        )}
      </Box>
    )
  );
};
