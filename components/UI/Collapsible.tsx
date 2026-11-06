"use client";
import AddIcon from "@mui/icons-material/AddCircle";
import MinusIcon from "@mui/icons-material/RemoveCircle";
import { Box, Button, Collapse } from "@mui/material";
import type React from "react";
import { useState } from "react";

export const Collapsible = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ my: "1rem" }}>
      <Button
        sx={{ marginY: "1rem" }}
        variant="contained"
        endIcon={open ? <MinusIcon /> : <AddIcon />}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? "بستن" : "افزودن"}
      </Button>
      <Collapse in={open} timeout={300} unmountOnExit>
        <Box
          sx={{
            border: "solid 2px",
            borderColor: "divider",
            borderRadius: "1rem",
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};
