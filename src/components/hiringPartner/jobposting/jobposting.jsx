// import React, { useState } from "react";
// import axios from "axios";
// import { styled } from "@mui/system";
// import NavbarComp from "../dashborad/navbar";
// import FooterComp from "../dashborad/footer";

// const FormContainer = styled("div")({
//   maxWidth: "700px",
//   margin: "auto",
//   padding: "20px",
//   boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
//   borderRadius: "12px",
//   backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight opacity for the container
//   backdropFilter: "blur(10px)", // Adds a subtle glassmorphism effect
//   border: "1px solid rgba(255, 255, 255, 0.5)",
// });

// const Title = styled("h2")({
//   textAlign: "center",
//   marginBottom: "20px",
//   fontSize: "1.8rem",
//   color: "#333",
//   fontWeight: "bold",
//   textTransform: "uppercase",
//   letterSpacing: "1.2px",
//   textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
// });

// const Label = styled("label")({
//   display: "block",
//   marginBottom: "5px",
//   fontSize: "1rem",
//   fontWeight: "600",
//   color: "#555",
// });

// const Input = styled("input")({
//   width: "100%",
//   padding: "10px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "1rem",
//   transition: "border 0.3s ease",
//   "&:focus": {
//     border: "1px solid #1976d2",
//     outline: "none",
//     boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
//   },
// });

// const TextArea = styled("textarea")({
//   width: "100%",
//   padding: "10px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "1rem",
//   transition: "border 0.3s ease",
//   minHeight: "100px",
//   "&:focus": {
//     border: "1px solid #1976d2",
//     outline: "none",
//     boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
//   },
// });

// const Select = styled("select")({
//   width: "100%",
//   padding: "10px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "1rem",
//   transition: "border 0.3s ease",
//   "&:focus": {
//     border: "1px solid #1976d2",
//     outline: "none",
//     boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
//   },
// });

// const Button = styled("button")({
//   padding: "12px 25px",
//   background: "linear-gradient(45deg, #1976d2, #42a5f5)",
//   color: "#fff",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontSize: "1rem",
//   fontWeight: "bold",
//   transition: "transform 0.2s, box-shadow 0.2s",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: "0 5px 15px rgba(25, 118, 210, 0.4)",
//   },
// });

// export default function JobPostingForm() {
//   const [formData, setFormData] = useState({
//     jobTitle: "",
//     companyName: "",
//     jobDescription: "",
//     location: "",
//     salary: "",
//     jobType: "",
//     skills: "",
//     postDate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
//     axios
//       .post(
//         "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobpostingData.json",
//         { ...formData, skills: skillsArray }
//       )
//       .then(() => {
//         alert("Successfully job posted");
        
//       })
//       .catch((error) => {
//         console.error("Error posting job:", error);
//       });
      
//   };

//   return (
//     <>
//     <NavbarComp/>
//     <div style={{backgroundColor:"rgb(2, 73, 108)", padding:"40px"}}>
//     <FormContainer>
//       <Title>Job Posting Form</Title>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Job Title:</Label>
//           <Input
//             type="text"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Company Name:</Label>
//           <Input
//             type="text"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Job Description:</Label>
//           <TextArea
//             name="jobDescription"
//             value={formData.jobDescription}
//             onChange={handleChange}
//             required
//           ></TextArea>
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Location:</Label>
//           <Input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Salary:</Label>
//           <Input
//             type="number"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Job Type:</Label>
//           <Select
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Job Type</option>
//             <option value="Full-Time">Full-Time</option>
//             <option value="Part-Time">Part-Time</option>
//             <option value="Contract">Contract</option>
//             <option value="Internship">Internship</option>
//           </Select>
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Skills (comma-separated):</Label>
//           <Input
//             type="text"
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             placeholder="e.g., JavaScript, React, Node.js"
//             required
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <Label>Post Date:</Label>
//           <Input
//             type="date"
//             name="postDate"
//             value={formData.postDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div style={{ textAlign: "center" }}>
//           <Button type="submit">Post Job</Button>
//         </div>
//       </form>
//     </FormContainer>
//   </div>
//   <FooterComp/>
//   </>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import NavbarComp from "../dashborad/navbar";
import FooterComp from "../dashborad/footer";

const FormContainer = styled("div")(({ theme }) => ({
  maxWidth: "700px",
  margin: "auto",
  padding: "20px",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  [theme.breakpoints.down("sm")]: {
    padding: "15px",
    maxWidth: "90%",
  },
}));

const Title = styled("h2")({
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "1.8rem",
  color: "#333",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1.2px",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
});

const Label = styled("label")({
  display: "block",
  marginBottom: "5px",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#555",
});

const Input = styled("input")({
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  transition: "border 0.3s ease",
  "&:focus": {
    border: "1px solid #1976d2",
    outline: "none",
    boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
  },
});

const TextArea = styled("textarea")({
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  transition: "border 0.3s ease",
  minHeight: "100px",
  "&:focus": {
    border: "1px solid #1976d2",
    outline: "none",
    boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
  },
});

const Select = styled("select")({
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  transition: "border 0.3s ease",
  "&:focus": {
    border: "1px solid #1976d2",
    outline: "none",
    boxShadow: "0 0 8px rgba(25, 118, 210, 0.3)",
  },
});

const Button = styled("button")({
  padding: "12px 25px",
  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 5px 15px rgba(25, 118, 210, 0.4)",
  },
});

export default function JobPostingForm() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    location: "",
    salary: "",
    jobType: "",
    skills: "",
    postDate: "",
    postedBy: "",
  });

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile && userProfile.fullName) {
      setFormData((prev) => ({ ...prev, postedBy: userProfile.fullName }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(",").map((skill) => skill.trim());
    axios
      .post(
        "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobpostingData.json",
        { ...formData, skills: skillsArray }
      )
      .then(() => {
        alert("Successfully job posted");
        setFormData({
          jobTitle: "",
          companyName: "",
          jobDescription: "",
          location: "",
          salary: "",
          jobType: "",
          skills: "",
          postDate: "",
          postedBy: formData.postedBy, 
        });
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });
  };

  return (
    <>
      <NavbarComp />
      <div style={{ backgroundColor: "rgb(2, 73, 108)", padding: "40px" }}>
        <FormContainer>
          <Title>Job Posting Form</Title>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <Label>Job Title:</Label>
              <Input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Company Name:</Label>
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Job Description:</Label>
              <TextArea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                required
              ></TextArea>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Location:</Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Salary:</Label>
              <Input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Job Type:</Label>
              <Select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Skills (comma-separated):</Label>
              <Input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Node.js"
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Post Date:</Label>
              <Input
                type="date"
                name="postDate"
                value={formData.postDate}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Label>Job Posted By:</Label>
              <Input
                type="text"
                name="postedBy"
                value={formData.postedBy}
                disabled
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button type="submit">Post Job</Button>
            </div>
          </form>
        </FormContainer>
      </div>
      <FooterComp />
    </>
  );
}

