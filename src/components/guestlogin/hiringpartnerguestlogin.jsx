import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";

function HiringManagerGuestLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check for small screens

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        "https://job-portal-fdc41-default-rtdb.firebaseio.com/hiringpartner.json"
      );
      const hiringPartners = response.data;

      let validCredentials = false;
      for (const key in hiringPartners) {
        if (hiringPartners.hasOwnProperty(key)) {
          const hiringPartner = hiringPartners[key];
          if (email === hiringPartner.email && password === hiringPartner.password) {
            validCredentials = true;
            break;
          }
        }
      }

      if (validCredentials) {
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching hiring partner data:", error);
      alert("Error fetching hiring partner data. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(90deg, rgb(2, 73, 108), rgb(9, 33, 69))",
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          maxWidth: isSmallScreen ? "90%" : "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Hiring Partner Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 2,
            padding: "10px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Login
        </Button>
        <Typography sx={{ marginTop: 2 }}>
          Default Email:{" "}
          <Link href="#" underline="hover">
            hiringguest@gmail.com
          </Link>
        </Typography>
        <Typography>Default Password: Guest@123</Typography>
      </Paper>
    </Box>
  );
}

export default HiringManagerGuestLogin;
