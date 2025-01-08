import React, { useState } from "react";
import axios from "axios";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../../firebase/firebaseconfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./jobseekersignup.css"; // Import the CSS file
import Alert from "../alert/Alert";

const JobSeekerSignup = () => {
  const signUpForm = getAuth(app);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fullName ,email, password, mobile } = formData;
      let signUpSuccess = await createUserWithEmailAndPassword(
        signUpForm,
        email,
        password
      );

      if (signUpSuccess) {
        const user = signUpSuccess.user;
        const db = getDatabase(app);

        // Save additional user data set meaning storing data in a specified location the location is jobseeker
        await set(ref(db, `jobseeker/${user.uid}`), {
          fullName,
          email,
          mobile,
          password,
        });
        setAlertMessage("Signup Successful");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/job-seeker/login");
        }, 3000);
      }
    } catch (err) {
      setError("Error submitting data. Please try again.");
      setAlertMessage("Signup failed! Please try again.");
      setShowAlert(true);
      console.error("Firebase submission error:", err);
    }
  };

  return (
    <div className="job-seeker-signup">
      <div className="signup-form">
        <h2 className="title">Job Seeker Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">
            Signup
          </button>
          <div className="login-link">
            If you are already a user,{" "}
            <Link to="/job-seeker/login">click here to login</Link>.
          </div>
        </form>
      </div>
      {showAlert && (
        <Alert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default JobSeekerSignup;
