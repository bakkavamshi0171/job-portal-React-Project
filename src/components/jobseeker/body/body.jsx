// src/body/body.js
import React from "react";
import "./Body.css";
import Content from "./content/content";


const Body = () => {
  return (
    <div className="body-container">
      <Content  /> {/* Pass searchTerm to Content */}
    </div>
  );
};

export default Body;