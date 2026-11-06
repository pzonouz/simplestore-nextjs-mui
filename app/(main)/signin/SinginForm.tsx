"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useSigninMutation } from "@/lib/redux/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { signinSchema } from "@/lib/schemas";
import { OpenErrorSnackbar, OpenSuccessSnackbar } from "@/lib/utils/snackbar";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export const SignInForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const router = useRouter();
  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  return (
    <SignInContainer
      direction="column"
      sx={{ justifyContent: "space-between" }}
    >
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          ورود
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            signin(data)
              .unwrap()
              .then(() => {
                OpenSuccessSnackbar(dispatch);
                router.push(callback ?? "/profile");
              })
              .catch(() => {
                OpenErrorSnackbar(
                  dispatch,
                  "نام کابری و کلمه عبور مطابقت ندارد",
                );
              });
          })}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <FormControl>
                  <FormLabel htmlFor="email">ایمیل</FormLabel>
                  <TextField
                    {...field}
                    type="email"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState?.error?.message}
                  />
                </FormControl>
              </>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <FormControl>
                  <FormLabel htmlFor="password">پسورد</FormLabel>
                  <TextField
                    {...field}
                    type="password"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState?.error?.message}
                  />
                </FormControl>
              </>
            )}
          />
          <Button
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
          >
            ورود
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            حساب کاربری ندارید؟
          </Typography>
          <Link
            href="/admin/signup"
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            ثبت نام
          </Link>
        </Box>
      </Card>
    </SignInContainer>
  );
};
