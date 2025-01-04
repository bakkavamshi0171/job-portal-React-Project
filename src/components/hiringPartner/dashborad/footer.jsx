import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

export default function FooterComp() {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Footer Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: 4,
        }}
      >
        {/* Logo and Description */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Job Portal
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: "300px", margin: "0 auto" }}>
            Your gateway to finding the best jobs in the industry.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="/about" color="inherit" underline="hover" sx={{ display: "block", marginBottom: "5px" }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" underline="hover" sx={{ display: "block", marginBottom: "5px" }}>
              Contact Us
            </Link>
            <Link href="/privacy" color="inherit" underline="hover" sx={{ display: "block", marginBottom: "5px" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" sx={{ display: "block", marginBottom: "5px" }}>
              Terms of Service
            </Link>
          </Box>
        </Box>

        {/* Social Media Links */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 2 }}>
            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom */}
      <Box
        sx={{
          marginTop: "30px",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          paddingTop: "10px",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
