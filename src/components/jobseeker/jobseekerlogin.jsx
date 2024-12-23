import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebaseconfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const LoginPage = () => {
  const loginWithHp = getAuth(app);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let user = await signInWithEmailAndPassword(
        loginWithHp,
        credentials.email,
        credentials.password
      );
      if (user) {
        alert("Login successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.code === "auth/user-not-found") {
        alert("User not found. Please check your email or sign up.");
      } else if (error.code === "auth/wrong-password") {
        alert("Invalid credentials! Please check your password.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format. Please enter a valid email.");
      } else if (error.code === "auth/network-request-failed") {
        alert("Network error: Please check your internet connection.");
      } else {
        alert("Login failed! Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2,rgb(8, 64, 160))",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            marginBottom: 2,
          }}
        >
          Job Portal Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            sx={{
              marginBottom: 2,
              "& .MuiInputBase-root": {
                borderRadius: 3,
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            sx={{
              marginBottom: 2,
              "& .MuiInputBase-root": {
                borderRadius: 3,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: 2,
              padding: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              "&:hover": {
                background: "linear-gradient(135deg, #42a5f5, #1976d2)",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
