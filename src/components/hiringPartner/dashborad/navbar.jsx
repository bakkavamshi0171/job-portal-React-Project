import React, { useRef, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router";
import SidebarComp from "./sidebar";
import "./navbar.css";

export default function NavbarComp() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const data = useRef("");
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    navigate("/hiringpartner/login");
  };

  const handlerSerach = (e) => {
    e.preventDefault();
    const searchValue = data.current.value;
    navigate("/hiringpartner/home/jobdetails/serach", { state: searchValue });
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <div className="navBar-Container">
        {/* Logo Section */}
        <div className="logo-section">
          <IconButton onClick={toggleDrawer(true)} className="menu-icon" style={{ color: "white", marginRight: "20px" }}>
            <FormatAlignJustifyIcon />
          </IconButton>
    
          <WorkIcon fontSize="large" className="work-icon" />
          <span>Job Portal</span>
          
        </div>

        <div className="avatar-section">
          {/* Search Bar */}
          <form onSubmit={handlerSerach}>
            <div className="search-bar">
              <input ref={data} type="text" placeholder="Search for jobs..." />
              <button onClick={handlerSerach}>
                <SearchIcon style={{ color: "#1976d2" }} />
              </button>
            </div>
          </form>

          {/* Avatar and Menu */}
          <div className="avatarsection">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1.8 }}>
                <Avatar />
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
              <MenuItem key="logout" onClick={handleLogout}>
                <Typography sx={{ textAlign: "center" }}>Log Out</Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <SidebarComp />
      </Drawer>
    </>
  );
}
