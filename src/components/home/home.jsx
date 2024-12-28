import React, { useState } from "react";
import NavbarComp from "../hiringPartner/dashborad/navbar";
import PostButton from "../hiringPartner/jobposting/postButton";
import MainComp from "../hiringPartner/dashborad/main";
import JobData from "../hiringPartner/jobposting/jobcard";
import "./home.css";

const HomePage = () => {
  const [filter, setFilter] = useState("");
  const [showJobs, setShowJobs] = useState(false);

  const filterJobs = (role) => {
    setFilter(role);
    setShowJobs(true);
  };

  return (
    <div className="home-page">
      <div>
        <NavbarComp />
      </div>
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
          {showJobs ? <JobData value={filter} /> : <h3 style={{color:"white", padding:"20px"}}>Select a React Jobs</h3>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

