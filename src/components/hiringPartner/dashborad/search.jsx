import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import NavbarComp from "./navbar";
import FooterComp from "./footer";
import axios from "axios";
import "../jobposting/jobcard.css";

export default function SearchingComp() {
  const [jobData, setJobData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.state || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUrl =
          process.env.REACT_APP_FIREBASE_URL ||
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobpostingData.json";
        const response = await axios.get(dataUrl);
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        messageApi.error("Failed to fetch job data. Please try again later.");
      }
    };
    fetchData();
  }, [messageApi]);

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
    const normalizedSearch = search.toLowerCase().trim().replace(/-/g, "");
    return Object.entries(jobData).filter(([key, job]) => {
      const normalizedTitle = job.jobTitle.toLowerCase().trim().replace(/-/g, "");
      return normalizedTitle.includes(normalizedSearch);
    });
  }, [jobData, search]);

  return (
    <>
      <NavbarComp />
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
                <span className="tag">{job.positions} positions</span>
                <span className="tag">Full Time</span>
                <span className="tag">{job.salary} LPA</span>
              </div>
              <div className="job-actions">
                <button
                  className="details-btn"
                  onClick={() => handleJobDetails(key)}
                >
                  Details
                </button>
                <button className="save-btn" onClick={warning}>
                  Apply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-jobs-message">
            No jobs match your search criteria. Please try a different keyword.
          </p>
        )}
      </div>
      <FooterComp />
    </>
  );
}

