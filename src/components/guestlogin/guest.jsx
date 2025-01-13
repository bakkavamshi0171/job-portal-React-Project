import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function GuestPage(){
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",

        background: "linear-gradient(90deg, rgb(2, 73, 108), rgb(9, 33, 69))",
        backgroundSize: "200% 200%",
        animation: "gradientBG 10s ease infinite",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#ffffff", textAlign:"center" }}>
        Choose Your Role
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/jobseeker/guestlogin")}
          sx={{
            padding: 2,
            width: "250px",
            fontSize:"larger",
            backgroundColor: "rgba(25, 118, 210, 0.8)",
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#1976d2",
            },
          }}
        >
          Job Seeker
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/hiringpartner/guestlogin")}
          sx={{
            padding: 2,
            width: "250px",
            fontSize:"larger",
            backgroundColor: "rgba(25, 118, 210, 0.8)",
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#1976d2",
            },
          }}
        >
          Hiring Partner
        </Button>
      </Box>

      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default GuestPage;