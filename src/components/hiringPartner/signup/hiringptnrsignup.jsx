import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../../firebase/firebaseconfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Link } from "@mui/material";

const HiringPartnerSignup = () => {
  const signUpForm = getAuth(app);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    company: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password, fullName, mobileNumber, company, role } = formData;
      let signUpSuccess = await createUserWithEmailAndPassword(
        signUpForm,
        email,
        password
      );

      if (signUpSuccess) {
        const user = signUpSuccess.user;
        const db = getDatabase(app);

        // Save additional user data set meaning store data in a specified location the location is 
        await set(ref(db, `hiringpartner/${user.uid}`), { 
          fullName,
          email,
          mobileNumber,
          company,
          role,
        });

        navigate("/hiringpartner/login");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Signup failed! Please try again.");
    }
  };

  return (
    // box meaning is div
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh", 
        background: "linear-gradient(135deg, #1976d2,rgb(7, 64, 155))",
        padding: 2,
      }}
    >
      
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 450, 
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Hiring Partner Signup
        </Typography>

        <form onSubmit={handleSignupSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            margin="normal"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Signup
          </Button>
        </form>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already a user?{" "}
          <Link
            href="/hiringpartner/login"
            sx={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default HiringPartnerSignup;

