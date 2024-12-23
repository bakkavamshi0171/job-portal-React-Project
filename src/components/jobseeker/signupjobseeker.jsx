import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebase/firebaseconfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from "@mui/material";

const JobSeekerSignup = () => {
  const signUpFormjs = getAuth(app);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, fullName, mobileNumber } = formData;
      let signUpSuccess = await createUserWithEmailAndPassword(
        signUpFormjs,
        email,
        password
      );

      if (signUpSuccess) {
        const user = signUpSuccess.user;
        const db = getDatabase(app);

        // Save additional user data
        await set(ref(db, `jobseeker/${user.uid}`), {
          fullName,
          email,
          mobileNumber,
          password,
        });
        alert("Successfully signed up!");
        navigate("/job-seeker/login");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2,rgb(45, 105, 164))",
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Job Seeker Signup
        </Typography>
        <Typography variant="body1" gutterBottom>
          Create your account to find your dream job!
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Full Name"
            name="fullName"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Mobile Number"
            name="mobileNumber"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
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
            Signup
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already a user?{" "}
          <Link
            href="/job-seeker/login"
            sx={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default JobSeekerSignup;




