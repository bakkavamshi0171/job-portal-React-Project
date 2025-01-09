import React, { useState, useEffect } from "react";
import Header from "../header/header";
import FooterComp from "../../hiringPartner/dashborad/footer";
import axios from "axios";
import { useNavigate } from "react-router";

export default function JbProfilePage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [previewPic, setPreviewPic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobSeekerLoginDetails.json";
        const profileUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobseeker.json";

        const [loginResponse, profileResponse] = await Promise.all([
          axios.get(loginUrl),
          axios.get(profileUrl),
        ]);

        const loginData = Object.values(loginResponse.data || {});
        const profileData = Object.values(profileResponse.data || {});

        const loginUser = loginData.find((item) => item.email);
        if (!loginUser) {
          console.error("No login user found");
          return;
        }

        const profileUser = profileData.find(
          (item) => item.email === loginUser.email
        );

        if (profileUser) {
          setUserDetails({
            fullName: profileUser.fullName || "",
            email: profileUser.email || "",
            mobile: profileUser.mobile || "",
          });
          console.log("User Details Updated:", profileUser);
        } else {
          console.log("No matching profile found for email:", loginUser.email);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewPic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Details:", userDetails);
    setIsEditing(false);
  };

  const handleGoBack =()=>{
    navigate(-1)
  }
  return (
    <div>
      <Header />
      <div className="profile-body">
        <div className="profile-page">
          <div className="profile-header">
            <h2>Profile Page</h2>
          </div>

          <div className="profile-container">
            <div className="profile-sidebar">
              <img
                src={previewPic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="profile-picture"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={userDetails.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="mobile"
                  value={userDetails.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <button
                type="button"
                className="go-back-btn"
                onClick={handleGoBack}
              >
                Go Back
              </button>
              
            </form>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

