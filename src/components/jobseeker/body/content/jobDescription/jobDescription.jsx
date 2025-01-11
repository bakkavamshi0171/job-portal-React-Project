import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, ref, get } from "../../../../../firebase/firebaseconfig";
import "./jobDescription.css";
import FooterComp from "../../../../hiringPartner/dashborad/footer";
import Header from "../../../header/header";

const JobDescription = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jobRef = ref(db, `jobpostingData/${jobId}`);
      const snapshot = await get(jobRef);
      if (snapshot.exists()) {
        setJobDetails(snapshot.val());
      } else {
        console.log("No data available");
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  return (
    <>
    <Header/>
    <div className="jobDescription">
      <div className="header">
        <h1>{jobDetails.jobTitle}</h1>
        <button
          className="applyButton"
          onClick={() =>
            navigate(`/submit-details`, {
              state: { jobTitle: jobDetails.jobTitle, companyName: jobDetails.companyName, postedBy: jobDetails.postedBy },
            })
          }
        >
          Apply
        </button>
      </div>
      <div>
        <p><strong>Company:</strong> {jobDetails.companyName}</p>
        <p><strong>PostedBy: </strong>{jobDetails.postedBy}</p>
        <p><strong>Description: </strong>{jobDetails.jobDescription}</p>
        <p><strong>JobType:</strong> {jobDetails.jobType}</p>
        <p><strong>Location:</strong> {jobDetails.location}</p>
        <p><strong>Date:</strong> {jobDetails.postDate}</p>
        <p><strong>Skills:</strong> {jobDetails.skills}</p>
      </div>
    </div>
    <FooterComp/>
    </>
  );
};

export default JobDescription;