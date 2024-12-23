import React from "react";
import NavbarComp from "../hiringPartner/navbar";
import PostButton from "../hiringPartner/main";
import SidebarComp from "../hiringPartner/sidebar"
// import JobPostingForm from "../hiringPartner/jobposting";

const HomePage = () => {
  return (
    <div style={{width:"100vw",height:"100vh" }}>
      <div style={{}}>
        <NavbarComp/>
      </div>
      <div style={{display:"flex", height:"95%"}}>
        {/* <SidebarComp/> */}
        <PostButton/>
      </div>
      
    </div>
  );
};

export default HomePage;
