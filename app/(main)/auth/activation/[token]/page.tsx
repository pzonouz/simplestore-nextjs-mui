"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { env } from "@/lib/env";

type Status = "loading" | "success" | "error";

export default function ActivationPage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<Status>("loading");
  const called = useRef(false);

  useEffect(() => {
    // React Strict Mode runs effects twice in dev; activation tokens are
    // usually single-use, so the second call would fail.
    if (called.current) return;
    called.current = true;

    fetch(`${env.NEXT_PUBLIC_API_URL}/auth/activation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => setStatus(res.ok ? "success" : "error"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <Box
      sx={{
        mt: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      {status === "loading" && <CircularProgress />}

      {status === "success" && (
        <>
          <Typography>فعالسازی با موفقیت انجام شد</Typography>
          <Button component={Link} href="/auth/signin" variant="contained">
            ورود
          </Button>
        </>
      )}

      {status === "error" && (
        <>
          <Typography color="error">توکن صحیح نیست</Typography>
          <Button component={Link} href="/auth/signup" variant="outlined">
            ثبت نام
          </Button>
        </>
      )}
    </Box>
  );
}
