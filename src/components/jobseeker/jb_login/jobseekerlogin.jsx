import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { app } from "../../../firebase/firebaseconfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./jobseekerlogin.css";
import Alert from "../alert/Alert";

const JobSeekerLogin = () => {
  const loginWithHp = getAuth(app);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        loginWithHp,
        credentials.email,
        credentials.password
      );
  
      if (user) {
        const dataUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobseeker.json";
        const response = await axios.get(dataUrl);
  
        if (!response.data) {
          setError("No data found in the database.");
          return;
        }
  
        const userProfile = Object.values(response.data).find(
          (profile) => profile.email === credentials.email
        );
  
        if (userProfile) {
          const seekers = Object.values(response.data || {});
          const validUser = seekers.find(
            (user) =>
              user.email === credentials.email &&
              user.password === credentials.password
          );
  
          if (validUser) {
            const loginDetailsUrl =
              "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobSeekerLoginDetails.json";
            const loginResponse = await axios.get(loginDetailsUrl);
            const loginDetails = loginResponse.data;
  
            if (loginDetails && Object.keys(loginDetails).length > 0) {
              const existingKey = Object.keys(loginDetails)[0];
              const updateUrl = `https://job-portal-fdc41-default-rtdb.firebaseio.com/jobSeekerLoginDetails/${existingKey}.json`;
  
              await axios.put(updateUrl, {
                email: credentials.email,
                password: credentials.password,
              });
            } else {
              await axios.post(loginDetailsUrl, {
                email: credentials.email,
                password: credentials.password,
              });
            }
  
            setShowAlert(true);
            setTimeout(() => {
              navigate("/job-seeker/home");
            }, 1000);
          } else {
            setError("Invalid email or password");
          }
        } else {
          setError("User profile not found.");
        }
      }
    } catch (err) {
      setError("Error logging in. Please try again.");
      console.error("Error during login:", err.message, err.response?.data);
    }
  };
  
  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Job Seeker Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="input"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
      {showAlert && (
        <Alert message="Login Successful" onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default JobSeekerLogin;
