import React, { useState } from "react";
import NavbarComp from "../hiringPartner/dashborad/navbar";
import PostButton from "../hiringPartner/jobposting/postButton";
import MainComp from "../hiringPartner/dashborad/main";
import JobData from "../hiringPartner/jobposting/jobcard";
import "./home.css";
import DarkVariantExample from "../hiringPartner/dashborad/carousal";
import FooterComp from "../hiringPartner/dashborad/footer";

const HomePage = () => {
  const [filter, setFilter] = useState("");
  const [showJobs, setShowJobs] = useState(false);

  const filterJobs = (role) => {
    setFilter(role);
    setShowJobs(true);
  };

  return (
    <div className="home-page">
      <NavbarComp />
      <div className="mainPage">
        <PostButton />
        <MainComp />
      </div>
      <div className="jobDisplaying-Container">
        <div className="button-container">
          <button onClick={() => filterJobs("")}>All</button>
          <button onClick={() => filterJobs("front-end")}>Front-End</button>
          <button onClick={() => filterJobs("backend")}>Back-End</button>
          <button onClick={() => filterJobs("devops")}>DevOps</button>
          <button onClick={() => filterJobs("business")}>Business</button>
        </div>
        <div className="jobdata-container">
          {showJobs ? (
            <JobData value={filter} />
          ) : (
            <h3 style={{ color: "white", padding: "20px" }}></h3>
          )}
        </div>
      </div>
      <div className="carousals-container">
        <h1 style={{ color: "white", margin: "20px" }}>
          Job Openings in Top Companies
        </h1>
        <DarkVariantExample />
      </div>
      <FooterComp />
    </div>
  );
};

export default HomePage;
