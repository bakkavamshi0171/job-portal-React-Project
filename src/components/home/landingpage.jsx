import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        animation: "gradientBG 10s ease infinite",
        background: "linear-gradient(90deg,rgb(2, 73, 108),rgb(9, 33, 69))",
        backgroundSize: "200% 200%",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "0px ",
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "rgb(41, 132, 222)" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: "0px 40px" }}>
            <WorkIcon fontSize="large" />
            <Typography variant="h6">Job Portal</Typography>
          </Box>

          <Typography variant="h6" sx={{ padding: "0px 40px" }}>
            Find Your Dream Job!
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flex: 1,
          padding: "20px",
          flexDirection: { xs: "column", sm: "row" }, 
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
            animation: "scaleUp 3s infinite",
          }}
        >
          <WorkIcon
            sx={{
              fontSize: 80,
              color: "#ffffff",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#ffffff",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Welcome to Job Portal
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              color: "#ffffff",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Find your dream job or hire top talent!
          </Typography>
        </Box>

        {/* Buttons Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: { xs: "center", sm: "flex-start" }, 
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/hiring-partner/signup")}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              color: "#ffffff",
              width:"200px",
              backgroundColor: "rgba(25, 118, 210, 0.8)",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#1976d2",
              },
            }}
          >
            <BusinessIcon fontSize="large" sx={{ marginBottom: 1 }} />
            Hiring Partner
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/job-seeker/signup")}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              color: "#ffffff",
              width:"200px",
              backgroundColor: "rgba(25, 118, 210, 0.8)",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#1976d2",
              },
            }}
          >
            <PersonIcon fontSize="large" sx={{ marginBottom: 1 }} />
            Job Seeker
          </Button>
        </Box>
      </Box>

      <style>
        {`
          @keyframes radialPulse {
            0% {
              background: radial-gradient(circle, #1976d2, #ffffff);
            }
            50% {
              background: radial-gradient(circle, #ffffff, #1976d2);
            }
            100% {
              background: radial-gradient(circle, #1976d2, #ffffff);
            }
          }

          @keyframes scaleUp {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}
      </style>
    </Box>
  );
};

export default LandingPage;
