// import React, { useState, useContext } from "react";
// import { db, storage } from "../../../firebase/firebaseconfig";
// import { doc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { userDetails as UserDetailsContext } from "../login/loginhiringptnr";
// import './ProfilePage.css'; 

// function ProfilePage() {
//   const storedProfile = localStorage.getItem("userProfile");
//   const userContext = useContext(UserDetailsContext) || JSON.parse(storedProfile);

//   const [userDetails, setUserDetails] = useState({
//     fullName: userContext?.fullName || "",
//     email: userContext?.email || "",
//     mobileNumber: userContext?.mobileNumber || "",
//     role: userContext?.role || "",
//     company: userContext?.company || "",
//   });
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewPic, setPreviewPic] = useState(userContext?.profilePic || "");
//   const [isEditing, setIsEditing] = useState(false);

//   const userId = userContext?.id || "";

//   if (!userContext && !localStorage.getItem("userProfile")) {
//     return <p>Loading user data...</p>;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({ ...userDetails, [name]: value });
//   };

//   const handleProfilePicUpload = async () => {
//     if (profilePic) {
//       const storageRef = ref(storage, `profile_pics/${userId}`);
//       await uploadBytes(storageRef, profilePic);
//       const downloadURL = await getDownloadURL(storageRef);

//       const docRef = doc(db, "users", userId);
//       await updateDoc(docRef, { profilePic: downloadURL });

//       setPreviewPic(downloadURL);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const docRef = doc(db, "users", userId);

//     await updateDoc(docRef, userDetails);
//     setIsEditing(false);
//     handleProfilePicUpload();
//   };

//   return (
//     <div className="profile-page">
//       <h2>Profile Page</h2>
//       <div className="profile-picture">
//         <img
//           src={previewPic || "https://via.placeholder.com/150"}
//           alt="Profile"
//           className="profile-img"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setProfilePic(e.target.files[0])}
//         />
//       </div>
//       <form className="profile-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="text"
//             name="fullName"
//             value={userDetails.fullName}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={userDetails.email}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>
//         <div className="form-group">
//           <label>Phone:</label>
//           <input
//             type="text"
//             name="mobileNumber"
//             value={userDetails.mobileNumber}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>
//         <div className="form-group">
//           <label>Role:</label>
//           <input
//             type="text"
//             name="role"
//             value={userDetails.role}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>
//         <div className="form-group">
//           <label>Company Name:</label>
//           <input
//             type="text"
//             name="company"
//             value={userDetails.company}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         </div>
//         {isEditing ? (
//           <button type="submit" className="save-btn">
//             Save Changes
//           </button>
//         ) : (
//           <button
//             type="button"
//             className="edit-btn"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit Profile
//           </button>
//         )}
//       </form>
//     </div>
//   );
// }

// export default ProfilePage;



import React, { useState, useContext } from "react";
import { db, storage } from "../../../firebase/firebaseconfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { userDetails as UserDetailsContext } from "../login/loginhiringptnr";
import "./ProfilePage.css"; // Import the CSS file for styling

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
  const [isEditing, setIsEditing] = useState(false);

  const userId = userContext?.id || "";

  if (!userContext && !localStorage.getItem("userProfile")) {
    return <p>Loading user data...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, userDetails);
      setIsEditing(false);
      await handleProfilePicUpload();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-button">← Back to Applicants</button>
        <h2>Profile Page</h2>
      </div>

      <div className="profile-container">
        {/* Profile Sidebar */}
        <div className="profile-sidebar">
          <img
            src={previewPic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-picture"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        {/* Profile Form */}
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
              name="mobileNumber"
              value={userDetails.mobileNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={userDetails.role}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="company"
              value={userDetails.company}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;

