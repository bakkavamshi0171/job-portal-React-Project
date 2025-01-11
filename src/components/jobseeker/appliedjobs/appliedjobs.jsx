import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import axios from "axios";
import "./appliedjobs.css";
import FooterComp from "../../hiringPartner/dashborad/footer";
import Header from "../header/header";

const AppliedJobs = () => {
  const [jobSeekerLoginDetails, setJobSeekerLoginDetails] = useState([]);
  const [formData, setFormData] = useState([]);
  const [matchedData, setMatchedData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobSeekerLoginDetails.json";
        const profileUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/formData.json";
        const [loginResponse, profileResponse] = await Promise.all([
          axios.get(loginUrl),
          axios.get(profileUrl),
        ]);
        const loginData = Object.values(loginResponse.data || {});
        const profileData = Object.entries(profileResponse.data || {}).map(
          ([key, value]) => ({ key, ...value })
        );
        setJobSeekerLoginDetails(loginData);
        setFormData(profileData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const matched = jobSeekerLoginDetails
      .flatMap((loginDetails) =>
        formData.filter((form) => form.email === loginDetails.email)
      )
      .filter(Boolean);
    setMatchedData(matched);
  }, [jobSeekerLoginDetails, formData]);
  

  const handleDeleteJob = async (jobKey) => {
    try {
      const deleteUrl = `https://job-portal-fdc41-default-rtdb.firebaseio.com/${jobKey}.json`;
      await axios.delete(deleteUrl);
      setFormData((prevData) => prevData.filter((data) => data.key !== jobKey));
      message.success("Job application withdrawn successfully!");
    } catch (error) {
      console.error("Error withdrawing job application:", error);
      message.error("Failed to withdraw the job application. Please try again.");
    }
  };

  const confirmDelete = (jobKey) => {
    Modal.confirm({
      title: "Are you sure you want to withdraw this job application?",
      content: "This action cannot be undone.",
      okText: "Yes, Withdraw",
      cancelText: "Cancel",
      onOk: () => handleDeleteJob(jobKey),
    });
  };

  return (
    <>
      <Header />
      <div className="job-container2">
        {contextHolder}
        {matchedData.length > 0 ? (
          matchedData.map((job) => (
            <div key={job.key} className="job-card2">
              <div className="job-header2">
                <div>
                  <h3 className="company-name2">{job.companyName} - Applied</h3>
                  <p className="job-location2">{job.location}</p>
                </div>
              </div>
              <h2 className="job-title2">{job.jobTitle}</h2>
              <p className="job-description2">
                <strong>Skills:</strong> {job.Skills}
              </p>
              <p>
                <strong>Full Name:</strong> {job.fullName}
              </p>
              <p>
                <strong>Email:</strong> {job.email}
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={job.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={job.LinkedInURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Profile
                </a>
              </p>
              {job.applicationstatus && (
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        job.applicationstatus === "Accepted"
                          ? "green"
                          : job.applicationstatus === "Rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                     {job.applicationstatus}, Congratulations your applicaation has been Proceeded further by company
                  </span>
                </p>
              )}
              <div className="job-tags2">
                <span className="tag2">Experience: {job.experience}</span>
                <span className="tag2">Full Time</span>
                <span className="tag2">{job.phoneNumber}</span>
              </div>
              <div className="job-actions2">
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
                  onClick={() => confirmDelete(job.key)}
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white", fontSize: "large" }}>
            No job applications found for the selected filter.
          </p>
        )}
      </div>
      <FooterComp />
    </>
  );
};

export default AppliedJobs;
