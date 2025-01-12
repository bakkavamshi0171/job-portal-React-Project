import React, { useState, useEffect, useRef, useMemo } from "react";
import { Progress } from "antd";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios"; // Make sure axios is imported
import "./main.css";

export default function MainComp() {
  const [applications, setApplications] = useState(0);
  const [jobData, setJobData] = useState([]);
  const [chartDimensions, setChartDimensions] = useState({ width: 700, height: 450 });
  const chartRef = useRef(null); // Create a ref for the chart container
  const [userName, setUserName] = useState(""); // Add userName state

  const maxApplications = 10;
  const progressPercent = (applications / maxApplications) * 100;

  const dataset = [
    { jobPost: "Front-end Developer", applications: 5, hired: 2 },
    { jobPost: "Devops", applications: 3, hired: 1 },
    { jobPost: "Business Manager", applications: 7, hired: 3 },
    { jobPost: "Backend Dev", applications: 4, hired: 1 },
    { jobPost: "Full Stack Developer", applications: 6, hired: 2 },
  ];

  // Function to update chart size based on the container width
  const updateChartDimensions = () => {
    if (chartRef.current) {
      const containerWidth = chartRef.current.offsetWidth;
      const newWidth = containerWidth > 700 ? 700 : containerWidth - 20; // Set max width to 700px
      const newHeight = newWidth * 0.6; // Adjust height relative to width
      setChartDimensions({ width: newWidth, height: newHeight });
    }
  };

  // Update chart dimensions on window resize
  useEffect(() => {
    updateChartDimensions(); // Set initial dimensions
    window.addEventListener("resize", updateChartDimensions); // Listen for resize events

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateChartDimensions);
    };
  }, []);

  // Fetch job data and user profile
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

  const filteredJobs = useMemo(() => {
    if (!jobData) return [];
    return Object.entries(jobData).filter(([key, job]) => {
      if (!userName) return true;
      return job.postedBy.toLowerCase().includes(userName.toLowerCase());
    });
  }, [jobData, userName]);

  // Update applications state when filteredJobs changes
  useEffect(() => {
    setApplications(filteredJobs.length);
  }, [filteredJobs]);

  return (
    <div className="main-container">
      {/* Progress Section */}
      <div className="progress-container">
        <h2 className="section-heading">Job Posts Per Month</h2>
        <Progress
          type="circle"
          percent={progressPercent}
          strokeWidth={12}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeColor="#1890ff"
          format={() => (
            <span className="progress-text">
              {applications} / {maxApplications}
            </span>
          )}
        />
        <h4 className="info-text">No of Jobs Posted : {applications}</h4>
        <h4 className="info-text">Per Month Limit :{maxApplications}</h4>
      </div>

      {/* Bar Chart Section */}
      <div className="chart-container" ref={chartRef}>
        <h2 className="section-heading">Job Applications and Hiring</h2>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "jobPost", label: "Job Roles" }]}
          yAxis={[
            { scaleType: "linear", dataKey: "applications", label: "Count" },
          ]}
          series={[
            {
              dataKey: "applications",
              label: "Applications Received",
              color: "#ff5722",
            },
            {
              dataKey: "hired",
              label: "Hired",
              color: "#3f51b5",
            },
          ]}
          layout="vertical"
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      </div>
    </div>
  );
}
