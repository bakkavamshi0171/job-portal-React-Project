import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "../jobposting/jobcard.css";
import NavbarComp from "../dashborad/navbar";
import FooterComp from "../dashborad/footer";

export default function PostedData() {
  const [userName, setUserName] = useState("");
  const [jobData, setJobData] = useState([]);
  
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobpostingData.json";
        const response = await axios.get(dataUrl);
        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (userProfile && userProfile.fullName) {
          setUserName(userProfile.fullName);
        }
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleJobDetails = (id) => {
    navigate(`/hiringpartner/home/jobdetails/${id}`);
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Hiring Partner can't apply",
    });
  };

  const filteredJobs = useMemo(() => {
    if (!jobData) return [];
    return Object.entries(jobData).filter(([key, job]) => {
      if (!userName) return true;
      return job.postedBy.toLowerCase().includes(userName.toLowerCase())
    });
  }, [jobData]);
  

  return (
    <>
      <NavbarComp />
      <div style={{}}>
      <div className="job-container">
        {contextHolder}
        {filteredJobs.length > 0 ? (

          filteredJobs.map(([key, job]) => (
            <div key={key} className="job-card">
              <div className="job-header">
                <div>
                  <h3 className="company-name">{job.companyName}</h3>
                  <p className="job-location">{job.location}</p>
                </div>
              </div>
              <h2 className="job-title">{job.jobTitle}</h2>
              <p className="job-description">{job.description}</p>
              <div className="job-tags">
                <span className="tag">Post Date: {job.postDate} </span>
                <span className="tag">Full Time</span>
                <span className="tag">{job.salary} LPA</span>
              </div>
              <div className="job-actions">
                <button
                  className="details-btn"
                  onClick={() => handleJobDetails(key)}>
                  Details
                </button>
                <button className="save-btn" onClick={warning}>
                  Apply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white", fontSize: "large" }}>
            No jobs found for the selected filter.
          </p>
        )}
      </div>
      </div>
      <FooterComp />
    </>
  );
}
