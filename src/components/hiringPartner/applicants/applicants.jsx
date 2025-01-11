import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Divider,
  IconButton,
} from "@mui/material";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import NavbarComp from "../dashborad/navbar";
import FooterComp from "../dashborad/footer";
import "./applicants.css";

const ApplicantsComp = () => {
  const [applicantsProfile, setApplicantsProfile] = useState([]);
  const [postingData, setPostingData] = useState([]);
  const [userName, setUserName] = useState("");

  // Fetch data from Firebase
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const applicantUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/formData.json";
        const response = await axios.get(applicantUrl);

        // Map the data to include the unique keys as `id`
        const applicants = Object.entries(response.data || {}).map(
          ([key, value]) => ({
            id: key, // Add the unique key as `id`
            ...value,
          })
        );
        setApplicantsProfile(applicants);

        const jobPostUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobpostingData.json";
        const jobPostingResponse = await axios.get(jobPostUrl);

        setPostingData(Object.values(jobPostingResponse.data || {}));

        const userProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (userProfile && userProfile.fullName) {
          setUserName(userProfile.fullName);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch job data. Please try again later.");
      }
    };
    fetchingData();
  }, []);

  // Update status of an applicant
  const updateStatus = async (applicantId, status) => {
    if (!applicantId) {
      console.error("Invalid applicantId:", applicantId);
      return;
    }

    try {
      // Construct the correct URL for the applicant
      const url = `https://job-portal-fdc41-default-rtdb.firebaseio.com/formData/${applicantId}.json`;

      // Update the status in the database
      const response = await axios.patch(url, { applicationstatus: status });
      console.log("Status updated successfully:", response.data);

      // Update the UI state
      setApplicantsProfile((prev) =>
        prev.map((applicant) =>
          applicant.id === applicantId
            ? { ...applicant, applicationstatus: status }
            : applicant
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const sendEmail = (email) => {
    console.log(`Email sent to: ${email}`);
  };

  // Compare job postings with applicants
  const compared = useMemo(() => {
    if (!postingData || !applicantsProfile) return [];

    return postingData
      .filter((job) => job.jobTitle && job.postedBy) // Ensure job has required fields
      .map((job) => {
        const matchedApplicants = applicantsProfile.filter((applicant) => {
          // Ensure applicant has required fields
          if (
            applicant.jobTitle &&
            applicant.postedBy &&
            userName &&
            userName.toLowerCase() === job.postedBy.toLowerCase() &&
            job.jobTitle.toLowerCase() === applicant.jobTitle.toLowerCase()
          ) {
            return true;
          }
          return false;
        });

        return matchedApplicants.length > 0
          ? { ...job, applicants: matchedApplicants }
          : null;
      })
      .filter(Boolean);
  }, [postingData, applicantsProfile, userName]);

  return (
    <div style={{ backgroundColor: "rgb(2, 73, 108)", width: "100%" }}>
      <NavbarComp />
      <div className="box-container">
        {compared.map((job) => (
          <Card key={job} sx={{ marginBottom: "20px", borderRadius: "8px" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {job.jobTitle}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {job.companyName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {job.jobType || "Job Type Not Specified"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Posted By: {job.postedBy}
              </Typography>
              <List>
                {(job.requirements || []).map((req, index) => (
                  <ListItem key={index} disablePadding>
                    {req}
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ marginY: "10px" }} />
              <Typography variant="h6" gutterBottom>
                Applicants
              </Typography>
              {job.applicants && job.applicants.length > 0 ? (
                job.applicants.map((applicant) => (
                  <Card
                    key={applicant.id}
                    sx={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1">
                        {applicant.name}
                      </Typography>
                      <Typography variant="body2">
                        Email: {applicant.email}
                      </Typography>

                      <Typography variant="body2">
                        Status:{" "}
                        <strong
                          style={{
                            color: `${
                              applicant.applicationstatus === "Accepted"
                                ? "green"
                                : "red"
                            }`,
                          }}
                        >
                          {applicant.applicationstatus || "Pending"}
                        </strong>
                      </Typography>
                      <Box>
                        <Button variant="contained" color="primary">
                          <a
                            href={applicant.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            View Resume
                          </a>
                        </Button>
                        <Button
                          variant="contained"
                          color="info"
                          sx={{ margin: "10px" }}
                          startIcon={<FaLinkedin />}
                        >
                          <a
                            href={applicant.LinkedInURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            LinkedIn
                          </a>
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => updateStatus(applicant.id, "Accepted")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => updateStatus(applicant.id, "Rejected")}
                          disabled={applicant.applicationstatus === "Accepted"}
                          sx={{
                            display:
                              applicant.applicationstatus === "Accepted"
                                ? "none"
                                : "inline-block",
                          }}
                        >
                          Reject
                        </Button>
                        <IconButton
                          color="primary"
                          onClick={() => sendEmail(applicant.email)}
                        >
                          <FaEnvelope />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" style={{ color: "white" }}>
                  No applicants for this job yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <FooterComp />
    </div>
  );
};

export default ApplicantsComp;

