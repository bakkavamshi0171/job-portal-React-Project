import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./jobDetails.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [ alert ,setAlert]= useState(false)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const dataUrl = "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobpostingData.json";
        const response = await axios.get(dataUrl);
        setJob(response.data[id]);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleapplyonHiring =()=>{
    setAlert(true);
  }

  if (!job) {
    return <p style={{marginTop:"50px", color:"blue", fontSize:"xx-large",textAlign:"center"}}>Loading job details...</p>;
  }

  return (
    <div className="job-details-overlay">
      <div className="job-details-container">
        <h1 className="job-title">{job.jobTitle}</h1>
        <h3 className="company-name">{job.companyName}</h3>
        <p className="job-location">Location: {job.location}</p>

        <div className="job-description">
          <h4>Description</h4>
          <p>{job.jobDescription}</p>
        </div>

        <div className="job-details">
          <p>
            <strong>Salary:</strong> {job.salary} LPA
          </p>
          <p>
            <strong>Job Type:</strong> Full Time
          </p>
        </div>

        <div className="job-actions">
          <button className="apply-btn" onClick={handleapplyonHiring}>
            Apply Now
          </button>
        </div>

        <div className="alert-message">
          {alert ? <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning Alert Hiring Partner Can't apply
      </Alert> : " "}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

