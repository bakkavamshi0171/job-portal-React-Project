import React from "react";
import { useHref, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SidebarComp() {
  
  const navigate = useNavigate(); 

  const handleNavigation = (route) => {
    if (route === "/email") {
      // Redirect to Gmail
      window.location.href = "https://mail.google.com/";
    } else {
      navigate(route);
    }
  };
  
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, route: "/home" },
    { text: "Profile", icon: <PersonIcon />, route: "/hiringpartner/home/profile" },
    { text: "Applicant Profiles", icon: <WorkIcon />, route: "/applied" },
    { text: "Posted Jobs", icon: <PostAddIcon />, route: "/hiringpartner/home/posteddata" },
    { text: "Send Mail", icon: <MailIcon />, route :"/email" },
  ];

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#333333",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 10px",
        boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.route)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 15px",
                cursor: "pointer",
                borderRadius: "4px",
                marginBottom: "10px",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#145cae")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              <span style={{ marginRight: "10px" }}>{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <hr style={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => handleNavigation("/hiringpartner/login")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            width: "100%",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e60000")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
        >
          <LogoutIcon style={{ marginRight: "10px" }} />
          Logout
        </button>
      </div>
    </div>
  );
}
