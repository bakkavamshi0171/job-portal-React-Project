import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, ref, get } from "../../../../../firebase/firebaseconfig";
import "./jobPosts.css";

const JobPosts = () => {
  const [jobSeekers, setJobSeekers] = useState([]); // State to store job seekers
  const [filters, setFilters] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    date: "",
    skills: "",
  }); // State to hold the filters
  const [appliedFilters, setAppliedFilters] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    date: "",
    skills: "",
  }); // State to hold the applied filters

  // Fetch job seekers from Firebase when the component mounts
  useEffect(() => {
    const fetchJobSeekers = async () => {
      const jobSeekersRef = ref(db, "jobpostingData");
      const snapshot = await get(jobSeekersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const seekers = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setJobSeekers(seekers); // Store fetched data in the jobSeekers state
      } else {
        console.log("No data available");
      }
    };

    fetchJobSeekers();
  }, []); // This useEffect runs only once when the component is mounted

  // Filter job seekers based on the applied filters
  const filteredJobSeekers = jobSeekers.filter((seeker) => {
    const jobTitleMatch = seeker.jobTitle
      ?.toLowerCase()
      .includes(appliedFilters.jobTitle.toLowerCase());
    const companyNameMatch = seeker.companyName
      ?.toLowerCase()
      .includes(appliedFilters.companyName.toLowerCase());
    const locationMatch = seeker.location
      ?.toLowerCase()
      .includes(appliedFilters.location.toLowerCase());
    const dateMatch = seeker.postDate?.includes(appliedFilters.date);
    const skillsMatch =
      seeker.skills && Array.isArray(seeker.skills)
        ? seeker.skills
            .map((skill) => skill.toLowerCase())
            .join(", ")
            .includes(appliedFilters.skills.toLowerCase())
        : (seeker.skills || "")
            .toLowerCase()
            .includes(appliedFilters.skills.toLowerCase());
    return (
      jobTitleMatch &&
      companyNameMatch &&
      locationMatch &&
      dateMatch &&
      skillsMatch
    );
  });

  // Update filters
  const updateFilters = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters
  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  // Remove filters
  const removeFilters = () => {
    setFilters({
      jobTitle: "",
      companyName: "",
      location: "",
      date: "",
      skills: "",
    });
    setAppliedFilters({
      jobTitle: "",
      companyName: "",
      location: "",
      date: "",
      skills: "",
    });
  };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", color: "white",textAlign:"center" ,marginTop:"20px", fontWeight:"700"}}>Job Seekers</h1>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-inputs">
          <input
            type="text"
            className="search-bar2"
            placeholder="Search by job title..."
            name="jobTitle"
            value={filters.jobTitle}
            onChange={updateFilters}
          />
          <input
            type="text"
            className="search-bar22"
            placeholder="Search by company name..."
            name="companyName"
            value={filters.companyName}
            onChange={updateFilters}
          />
          <input
            type="text"
            className="search-bar2"
            placeholder="Search by location..."
            name="location"
            value={filters.location}
            onChange={updateFilters}
          />
          <input
            type="date"
            className="search-bar2"
            placeholder="Search by date..."
            name="date"
            value={filters.date}
            onChange={updateFilters}
          />
          <input
            type="text"
            className="search-bar2"
            placeholder="Search by skills..."
            name="skills"
            value={filters.skills}
            onChange={updateFilters}
          />
        </div>
        <div className="search-buttons">
          <button onClick={applyFilters}>Apply Filters</button>
          <button onClick={removeFilters}>Remove Filters</button>
        </div>
      </div>

      <div className="posts">
        {filteredJobSeekers.length === 0 ? (
          <p>No job seekers found</p> // If no job seekers match the search, display this message
        ) : (
          filteredJobSeekers.map((seeker) => (
            <div className="jobPosts" key={seeker.id}>
              <h2> {seeker.jobTitle}</h2>
              <h4> {seeker.companyName}</h4>
              <div>
                <p>
                  <span></span> {seeker.location}
                </p>
                <p>
                  <span>Date:</span> {seeker.postDate}
                </p>
              </div>
              <div className="skills-box">
                <p>
                  <span>Skills:</span>{" "}
                  {Array.isArray(seeker.skills)
                    ? seeker.skills.join(", ")
                    : seeker.skills}
                </p>
              </div>
              <Link to={`/job-seeker/ui/job-description/${seeker.id}`}>
                <button className="btnapply">Apply</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPosts;