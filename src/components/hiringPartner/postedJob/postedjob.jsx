import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
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

  const handleDeleteJob = async (jobKey) => {
    try {
      const deleteUrl = `https://job-portal-fdc41-default-rtdb.firebaseio.com/jobpostingData/${jobKey}.json`;
      await axios.delete(deleteUrl);

      // Update the jobData state after successful deletion
      setJobData((prevData) => {
        const updatedData = { ...prevData };
        delete updatedData[jobKey];
        return updatedData;
      });

      message.success("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      message.error("Failed to delete the job. Please try again.");
    }
  };

  const confirmDelete = (jobKey) => {
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      onOk: () => handleDeleteJob(jobKey),
    });
  };

  const filteredJobs = useMemo(() => {
    if (!jobData) return [];
    return Object.entries(jobData).filter(([key, job]) => {
      if (!userName) return true;
      return job.postedBy.toLowerCase().includes(userName.toLowerCase());
    });
  }, [jobData]);

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
                <span className="tag">Post Date: {job.postDate} </span>
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
                <button
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "backgroundColor 0.3s, color 0.3s",
                  }}
                  onClick={() => confirmDelete(key)}
                >
                  Delete Job
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
      <FooterComp />
    </>
  );
}
