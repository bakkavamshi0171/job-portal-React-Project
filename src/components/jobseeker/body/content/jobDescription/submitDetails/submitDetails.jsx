import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db, ref, push, get } from '../../../../../../firebase/firebaseconfig';
import './submitDetails.css';

const SubmitDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobTitle, companyName, postedBy } = location.state || {};

  const initialFormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    Skills: '',
    LinkedInURL: '',
    resumeUrl: '',
    gender: '',
    experience: '',
    jobTitle: jobTitle || '',
    companyName: companyName || '',
    postedBy: postedBy || ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchPostedBy = async () => {
      try {
        const postedByRef = ref(db, 'postedBy'); // Change this to the appropriate path in your database
        const snapshot = await get(postedByRef);
        if (snapshot.exists()) {
          const postedByData = snapshot.val();
          setFormData((prevData) => ({
            ...prevData,
            postedBy: postedByData
          }));
        }
      } catch (error) {
        console.error('Error fetching postedBy:', error);
      }
    };

    fetchPostedBy();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormDataRef = ref(db, 'formData');
    push(newFormDataRef, formData)
      .then(() => {
        console.log('Form data saved successfully.');
        setShowMessage(true);
        // Reset form data to initial state
        setFormData(initialFormData);
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

        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Skills:
          <input type="text" name="Skills" value={formData.Skills} onChange={handleChange} placeholder='Enter Skills here' required />
        </label>
        <label>
          LinkedIn URL:
          <input type="text" name="LinkedInURL" value={formData.LinkedInURL} onChange={handleChange} placeholder="Paste LinkedIn URL" required />
        </label>
        <label>
          Resume:
          <input type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="Paste drive link" required />
        </label>
        <label>
          Gender:
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required />
            Female
          </label>
        </label>
        <label>
          Experience:
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} required />
        </label>
        <div className="buttonContainer">
          <button type="submit" className="submitButton">Submit</button>
          {showMessage && (
            <button type="button" className="goHomeButton" onClick={handleGoHome}>Go to Home</button>
          )}
        </div>
      </form>
      {showMessage && <div className="confirmationMessage">Form submitted successfully!</div>}
    </div>
  );
};

export default SubmitDetails;