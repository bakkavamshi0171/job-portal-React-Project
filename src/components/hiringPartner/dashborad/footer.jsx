import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

export default function FooterComp() {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(25, 118, 210);",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: 3,
        }}
      >
        {/* Logo and Description */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Job Portal
          </Typography>
          <Typography variant="body2">
            Your gateway to finding the best jobs in the industry.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
          </Box>
          <Box>
            <Link href="/contact" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Box>
          <Box>
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
          <Box>
            <Link href="/terms" color="inherit" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Box>

        {/* Social Media Links */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              sx={{ color: "white" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              sx={{ color: "white" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              sx={{ color: "white" }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              sx={{ color: "white" }}
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom */}
      <Box sx={{ marginTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.2)", paddingTop: "10px" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
