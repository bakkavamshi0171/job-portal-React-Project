import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db, ref, push, get } from '../../../../../../firebase/firebaseconfig';
import './submitDetails.css';
import axios from 'axios';

const SubmitDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobTitle, companyName, postedBy } = location.state || {};
  const [personData, setPersonData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    Skills: "",
    LinkedInURL: "",
    resumeUrl: "",
    gender: "",
    experience: "",
    jobTitle: jobTitle || "",
    companyName: companyName || "",
    postedBy: postedBy || "",
  });

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const loginDetailsUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobSeekerLoginDetails.json";
        const response = await axios.get(loginDetailsUrl);

        if (response.data) {
          const userProfile = Object.values(response.data).find(
            (profile) => profile.email
          );

          if (userProfile) {
            setPersonData({
              email: userProfile.email,
              fullName: userProfile.fullName || "",
              mobileNumber: userProfile.mobileNumber || "",
            });

            setFormData((prevData) => ({
              ...prevData,
              fullName: userProfile.fullName || "",
              email: userProfile.email || "",
              phoneNumber: userProfile.mobileNumber || "",
            }));
          } else {
            console.log("No matching user profile found.");
          }
        } else {
          console.log("No data found in jobSeekerLoginDetails.");
        }
      } catch (error) {
        console.error("Error fetching person data:", error);
      }
    };

    fetchPersonData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormDataRef = ref(db, 'formData');
    push(newFormDataRef, formData)
      .then(() => {
        console.log('Form data saved successfully.');
        setShowMessage(true);
        // Reset form data to initial state
        setFormData({
          ...formData,
          Skills: "",
          LinkedInURL: "",
          resumeUrl: "",
          gender: "",
          experience: "",
        });
      })
      .catch((error) => {
        console.error('Error saving form data:', error);
      });
  };

  const handleGoHome = () => {
    navigate('/job-seeker/home');
  };

  return (
    <div className="submitDetails">
      <h1>Submit Details</h1>
      <form onSubmit={handleSubmit}>
        {jobTitle && <p><strong>Job Title:</strong> {jobTitle}</p>}
        {companyName && <p><strong>Company Name:</strong> {companyName}</p>}
        {postedBy && <p><strong>Posted By:</strong> {postedBy}</p>}

        <label htmlFor="fullName">
          Full Name:
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="phoneNumber">
          Phone Number:
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="Skills">
          Skills:
          <input
            id="Skills"
            type="text"
            name="Skills"
            value={formData.Skills}
            onChange={handleChange}
            placeholder="Enter Skills here"
            required
          />
        </label>
        <label htmlFor="LinkedInURL">
          LinkedIn URL:
          <input
            id="LinkedInURL"
            type="text"
            name="LinkedInURL"
            value={formData.LinkedInURL}
            onChange={handleChange}
            placeholder="Paste LinkedIn URL"
            required
          />
        </label>
        <label htmlFor="resumeUrl">
          Resume:
          <input
            id="resumeUrl"
            type="text"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            placeholder="Paste drive link"
            required
          />
          <p>Provide only Drive access link; other links are not considered.</p>
        </label>
        <fieldset>
          <legend>Gender:</legend>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </fieldset>
        <label htmlFor="experience">
          Experience:
          <input
            id="experience"
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </label>
        <div className="buttonContainer">
          <button type="submit" className="submitButton">Submit</button>
          {showMessage && (
            <button type="button" className="goHomeButton" onClick={handleGoHome}>
              Go to Home
            </button>
          )}
        </div>
      </form>
      {showMessage && <div className="confirmationMessage">Form submitted successfully!</div>}
    </div>
  );
};

export default SubmitDetails;
