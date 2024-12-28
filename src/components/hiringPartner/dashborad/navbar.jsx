import React, { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router";
import SidebarComp from "./sidebar";

export default function NavbarComp() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1976d2",
        color: "#fff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={toggleDrawer(true)}
          style={{ color: "white", marginRight: "20px" }}
        >
          <FormatAlignJustifyIcon />
        </IconButton>
        <WorkIcon fontSize="large" style={{ marginRight: "8px" }} />
        <span style={{ fontWeight: "bold", fontSize: "35px" }}>Job Portal</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "4px",
            padding: "5px 10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            width: "300px",
          }}
        >
          <input
            type="text"
            placeholder="Search for jobs..."
            style={{
              flexGrow: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
              padding: "5px",
            }}
          />
          <button
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            <SearchIcon style={{ color: "#1976d2" }} />
          </button>
        </div>

        {/* Avatar and Menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p:  1.8}}>
              <Avatar
                style={{ backgroundColor: "orange", cursor: "pointer" }}
              ></Avatar>
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
        </Box>
        
      </div>
    </div>
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <SidebarComp/>
    </Drawer>
    </>
  );
}
