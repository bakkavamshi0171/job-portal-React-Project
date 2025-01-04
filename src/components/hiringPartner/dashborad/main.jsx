import React, { useState } from "react";
import { Progress } from "antd";
import { BarChart } from "@mui/x-charts/BarChart";
import "./main.css"; 

export default function MainComp() {
  const [applications, setApplications] = useState(5);

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
    height: 450,
  };

  return (
    <div className="main-container">
      {/* Progress Section */}
      <div className="progress-container">
        <h2 className="section-heading">Application Progress</h2>
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
        <h4 className="info-text">No of Applications: {applications}</h4>
        <h4 className="info-text">No of Openings: {maxApplications}</h4>
      </div>

      {/* Bar Chart Section */}
      <div className="chart-container">
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
          {...chartSetting}
        />
      </div>
    </div>
  );
}
