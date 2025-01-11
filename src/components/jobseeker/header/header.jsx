import React, { useState, useEffect } from "react";
import WorkIcon from "@mui/icons-material/Work";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";

function Header() {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userImage, setUserImage] = useState(null); // State for uploaded image
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const loginDetailsUrl =
          "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobSeekerLoginDetails.json";
        const loginResponse = await axios.get(loginDetailsUrl);
        const loginDetails = Object.values(loginResponse.data || {});
        const lastLogin = loginDetails[loginDetails.length - 1];
        const email = lastLogin ? lastLogin.email : null;

        if (email) {
          const databaseUrl =
            "https://job-portal-fdc41-default-rtdb.firebaseio.com/jobseeker.json";
          const response = await axios.get(databaseUrl);
          const seekers = Object.values(response.data || {});
          const user = seekers.find((user) => user.email === email);

          if (user) {
            setUserDetails(user);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result); // Set uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    navigate("/job-seeker/login");
  };

  return (
    <header className="navBar-Container">
      {/* Logo Section */}
      <div className="logo-section">
        <IconButton style={{ color: "white" }}>
          <WorkIcon fontSize="large" />
        </IconButton>
        <span>Job Portal</span>
      </div>

      {/* Avatar Section */}
      <div className="avatar-section">
        <ul className="nav-item">
        <li
            className="item1"
            onClick={() => {
              navigate("/job-seeker/home");
            }}
          >
            Home
          </li>
          <li
            className="item1"
            onClick={() => {
              navigate("/job-seeker/home/profile");
            }}
          >
            Profile
          </li>
          <li
            className="item1"
            onClick={() => {
              navigate("/jobseeker/home/appliedjobs");
            }}
          >
            {" "}
            Applied Jobs
          </li>
        </ul>

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 1.8 }}>
            <Avatar src={userImage || "https://tinyurl.com/2dnywp4w"} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {/* User Details */}
          {userDetails && (
            <MenuItem>
              <Typography>
                <strong>{userDetails.name}</strong>
              </Typography>
            </MenuItem>
          )}
          <MenuItem>
            <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
              Upload Image
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </label>
          </MenuItem>
          
          <MenuItem onClick={handleLogout}>
            <Typography>Log Out</Typography>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
