import React, { createContext, useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../../../firebase/firebaseconfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Button, Typography, Paper, Alert } from "@mui/material";
import axios from "axios";
import { Logindetails } from "./personData";

export const userDetails = createContext();


const LoginPage = () => {
  const loginWithHp = getAuth(app);
  const {setPersonDetails}= useContext(Logindetails); //usecontext from login page Details
  const [loginalert, setLoginalert] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loginmsg, setLoginmsg] = useState(false);
  const[loginfail, setLoginFail]= useState(false);
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  

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
      const user = await signInWithEmailAndPassword(
        loginWithHp,
        credentials.email,
        credentials.password
      );

      if (user) {
        
        const dataUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/hiringpartner.json";
        const response = await axios.get(dataUrl);

        const userProfile = Object.values(response.data).find(
          (profile) => profile.email === credentials.email
        );

        if (userProfile) {
          setProfile(userProfile);
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          setPersonDetails(userProfile);
          setLoginalert(true);
          navigate("/home");

        } else {
          setLoginmsg(true);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.code === "auth/user-not-found") {
        setLoginmsg(true)
      } else if (error.code === "auth/wrong-password") {
        setLoginFail(true)
      } else if (error.code === "auth/invalid-email") {
        setLoginFail(true)
      } else if (error.code === "auth/network-request-failed") {
        alert("Network error: Please check your internet connection.");
      } else {
        setLoginFail(true)
      }
    }
  };

  return (
    <userDetails.Provider value={profile}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1976d2, rgb(8, 64, 160))",
          padding: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            maxWidth: 500,
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

          {loginfail?(<Alert variant="outlined" severity="warning">Login Failed!Check your Email or Password Correctly</Alert>) : ("") }
          {loginmsg ? (<Alert variant="outlined" severity="error">User profile not found Please go back and signup .</Alert>) : ("")};
          {loginalert ? (<Alert variant="outlined" severity="success">Login Successfully.</Alert>) : ("")}

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
    </userDetails.Provider>
  );
};

export default LoginPage;
