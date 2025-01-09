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
import JSApp from "../jobseeker/JSApp";
import JobPosts from "../jobseeker/body/content/jobPosts/jobPosts";
import JobDescription from "../jobseeker/body/content/jobDescription/jobDescription";
import SubmitDetails from "../jobseeker/body/content/jobDescription/submitDetails/submitDetails";
import JbProfilePage from "../jobseeker/profilepage/jbprofilepage";
import AppliedJobs from "../jobseeker/appliedjobs/appliedjobs";

export default function Routings() {
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
            <Route path="/job-seeker/home" element={< JSApp/>} />
            <Route path="/job-seeker/ui/job-description/:id" element={<JobDescription />}/>
            <Route path="/job-seeker/ui/job-posts" element={<JobPosts />} />
            <Route path="/submit-details" element={<SubmitDetails />} />
            <Route path="/job-seeker/home/profile" element={<JbProfilePage />} />
            <Route path="/jobseeker/home/appliedjobs" element={<AppliedJobs />} />


          </Routes>
        </BrowserRouter>
      </LoginPersonDetailsProvider>
    </>
  );
}


