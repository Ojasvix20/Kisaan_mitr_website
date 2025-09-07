// src/components/Navbar.jsx

import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Import Icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';
import SensorsIcon from '@mui/icons-material/Sensors';
import ForumIcon from '@mui/icons-material/Forum';

// Define the navigation links for the drawer
const navItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'AI Crop Analyzer', path: '/crop-analyzer', icon: <ScienceIcon /> },
  { text: 'Sensor Data', path: '/sensor-data', icon: <SensorsIcon /> },
  { text: 'Expert Chat', path: '/expert-chat', icon: <ForumIcon /> },
];

function Navbar() {
  // State to manage whether the drawer is open or closed
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Function to toggle the drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // The list of navigation items to display inside the drawer
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Kisaan Mitr 🌱
          </Typography>

          <div id="google_translate_element"></div>

          {/* This IconButton now opens the drawer */}
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* The Drawer component itself */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>
    </>
  );
}

export default Navbar;