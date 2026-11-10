import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      dir="rtl"
      sx={{
        bgcolor: "#1f2937",
        color: "common.white",
        mt: 64,
        py: 4,
        fontFamily: "iransansx",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {/* تماس با ما */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              تماس با ما
            </Typography>

            <Stack spacing={1.5}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <PhoneIcon fontSize="small" />
                <Typography>تلفن:</Typography>
                <Link
                  href="tel:09040427153"
                  color="inherit"
                  underline="hover"
                  dir="ltr"
                  sx={{ fontWeight: 600 }}
                >
                  04533740531
                </Link>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon fontSize="small" sx={{ mt: 0.25 }} />
                  <Typography>آدرس:</Typography>
                  <Typography sx={{ lineHeight: 1.9 }}>
                    اردبیل-کارشناسان-میدان وصال-برج وصال-بلوک یک - طبقه۸ واحد ۵
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.15)" }} />

        <Typography variant="body2" align="center" sx={{ color: "grey.400" }}>
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </Typography>
      </Container>
    </Box>
  );
}
