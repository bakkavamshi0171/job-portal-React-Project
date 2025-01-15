import React, { useState, useContext } from "react";
import { db, storage } from "../../../firebase/firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { userDetails as UserDetailsContext } from "../login/loginhiringptnr";
import "./ProfilePage.css"; 
import NavbarComp from "../dashborad/navbar";
import FooterComp from "../dashborad/footer";
import { useNavigate } from "react-router";


function ProfilePage() {
  const storedProfile = localStorage.getItem("userProfile");
  const userContext = useContext(UserDetailsContext) || JSON.parse(storedProfile);

  const [userDetails, setUserDetails] = useState({
    fullName: userContext?.fullName || "",
    email: userContext?.email || "",
    mobileNumber: userContext?.mobileNumber || "", 
    role: userContext?.role || "",
    company: userContext?.company || "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(userContext?.profilePic || "");
  const navigate = useNavigate();
  const userId = userContext?.id || "";


  if (!userContext && !localStorage.getItem("userProfile")) {
    return <p>Loading user data...</p>;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file)); 
    }
  };


  const handleProfilePicUpload = async () => {
    if (profilePic) {
      try {
        const storageRef = ref(storage, `profile_pics/${userId}`);
        await uploadBytes(storageRef, profilePic);
        const downloadURL = await getDownloadURL(storageRef);

        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, { profilePic: downloadURL });

        setPreviewPic(downloadURL);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };


  return (
    <>
    <NavbarComp/>
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

        
        <form className="profile-form" >
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="mobileNumber"
              value={userDetails.mobileNumber}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={userDetails.role}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="company"
              value={userDetails.company}
              onChange={handleChange}
              
            />
          </div>
          
            <button
              type="button"
              className="edit-btn"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>

        </form>
      </div>
    </div>
  </div>
    <FooterComp/>
    </>
  );
}

export default ProfilePage;
