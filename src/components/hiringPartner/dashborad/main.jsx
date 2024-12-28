import React, { useState } from "react";
import { Progress } from "antd";
import { BarChart } from "@mui/x-charts/BarChart";


export default function MainComp() {
  const [applications, setApplications] = useState(5);
   // Example value for applications

  const maxApplications = 10;
  const progressPercent = (applications / maxApplications) * 100; 

  const dataset = [
    { jobPost: "Software Engineer", applications: 5, hired: 2 },
    { jobPost: "Data Scientist", applications: 3, hired: 1 },
    { jobPost: "Product Manager", applications: 7, hired: 3 },
    { jobPost: "UI/UX Designer", applications: 4, hired: 1 },
    { jobPost: "Full Stack Developer", applications: 6, hired: 2 },
  ];
  
  const chartSetting = {
    width: 700, 
    height: 450,}

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2.5fr",
        gap: "20px",
        padding: "20px",
      }}
    >
      {/* Progress Section */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Application Progress</h2>
        <Progress
          type="circle"
          percent={progressPercent}
          strokeWidth={12}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeColor="#1890ff"
          format={() => (
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {applications} / {maxApplications}
            </span>
          )}
        />
        <h4 style={{ margin: "10px", padding:"10px" }}>No of Applications : {applications}</h4>
        <h4 style={{ margin: "10px", padding:"10px" }}>No of Openings : {maxApplications}</h4>
      </div>

      {/* Bar Chart Section */}
      <div
        style={{
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Job Applications and Hiring
        </h2>
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
              color: "#ff5722", // Updated bar color
            },
            {
              dataKey: "hired",
              label: "Hired",
              color: "#3f51b5", // Updated bar color
            },
          ]}
          layout="vertical"
          {...chartSetting}
        />
      </div>
    </div>
  );
}

