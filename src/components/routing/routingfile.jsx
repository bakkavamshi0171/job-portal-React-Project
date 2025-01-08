import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../home/landingpage";
import HiringPartnerSignup from "../hiringPartner/signup/hiringptnrsignup";
import JobSeekerSignup from "../jobseeker/jb_signup/signupjobseeker";
import LoginPage from "../hiringPartner/login/loginhiringptnr";
import HomePage from "../home/home";
import JobSeekerLogin from "../jobseeker/jb_login/jobseekerlogin";
import JobPostingForm from "../hiringPartner/jobposting/jobposting";
import JobDetails from "../hiringPartner/jobposting/jobdetails";
import SearchingComp from "../hiringPartner/dashborad/search";
import ProfilePage from "../hiringPartner/proflie/profliocomp";
import PostedData from "../hiringPartner/postedJob/postedjob";
import ApplicantsComp from "../hiringPartner/applicants/applicants";
import { ContactUs } from "../hiringPartner/contactpage/contact";
import { AboutUs } from "../hiringPartner/contactpage/aboutus";
import { LoginPersonDetailsProvider}  from "../hiringPartner/login/personData";

export default function StartRouting() {
  return (
    <>
      <LoginPersonDetailsProvider>
        <BrowserRouter>
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/hiring-partner/signup"
              element={<HiringPartnerSignup />}
            />
            <Route path="/job-seeker/signup" element={<JobSeekerSignup />} />
            <Route path="/hiringpartner/login" element={<LoginPage />} />
            <Route path="/job-seeker/login" element={<JobSeekerLogin />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/jobposting" element={<JobPostingForm />} />
            <Route
              path="/hiringpartner/home/jobdetails/:id"
              element={<JobDetails />}
            />
            <Route
              path="/hiringpartner/home/jobdetails/serach"
              element={<SearchingComp />}
            />
            <Route
              path="/hiringpartner/home/profile"
              element={<ProfilePage />}
            />
            <Route
              path="/hiringpartner/home/posteddata"
              element={<PostedData />}
            />
            <Route
              path="/hiringpartner/home/applicantsdata"
              element={<ApplicantsComp />}
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </BrowserRouter>
      </LoginPersonDetailsProvider>
    </>
  );
}


