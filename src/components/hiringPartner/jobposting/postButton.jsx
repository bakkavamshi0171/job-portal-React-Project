import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

export default function PostButton() {
  const navigate = useNavigate();
  const handlePost=()=>{
    navigate("/home/jobposting");
  }
  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
         onClick={handlePost}
        style={{ width: "100%", padding: "10px", fontSize: "20px" }}>
        Post a Job
      </Button>
    </div>
  );
}
