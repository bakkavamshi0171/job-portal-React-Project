import React from 'react'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import LandingPage from '../home/landingpage';
import HiringPartnerSignup from "../hiringPartner/hiringptnrsignup"
import JobSeekerSignup from "../jobseeker/signupjobseeker";
import LoginPage from "../hiringPartner/loginhiringptnr";
import HomePage from "../home/home";
import JobSeekerLoginPage from "../jobseeker/jobseekerlogin";
import JobPostingForm from '../hiringPartner/jobposting';

export default function StartRouting() {
    
  return (
    <div>
    <BrowserRouter>
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/hiring-partner/signup" element={<HiringPartnerSignup />} />
        <Route path="/job-seeker/signup" element={<JobSeekerSignup />} />
        <Route path="/hiringpartner/login" element={<LoginPage />} />
        <Route path="/job-seeker/login" element={<JobSeekerLoginPage/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/jobposting" element={<JobPostingForm />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  )
}
