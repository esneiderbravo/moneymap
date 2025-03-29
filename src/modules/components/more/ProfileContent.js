import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../providers/AppProvider";

/**
 * ProfileContent Component
 * Displays the user's profile menu, allowing navigation and logout.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.openProfile - Indicates if the profile drawer is open.
 * @param {Function} props.setOpenProfile - Function to update the open state of the profile drawer.
 * @param {Function} props.setSelectedPage - Function to reset the selected page when closing.
 * @returns {React.JSX.Element} The rendered ProfileContent component.
 */
const ProfileContent = ({ openProfile, setOpenProfile, setSelectedPage }) => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { authData } = state;

  /**
   * Handles closing the profile drawer.
   * Removes focus before closing to avoid accessibility issues.
   *
   * @param {React.SyntheticEvent} event - The triggering event.
   */
  const handleClose = (event) => {
    event.stopPropagation();
    setOpenProfile(false);
    setSelectedPage(null);
  };

  /**
   * Listens for the back button event (on Android) or browser navigation.
   * Closes the settings drawer when the back button is pressed.
   */
  useEffect(() => {
    const handleBackButton = (event) => {
      event.stopPropagation();
      setOpenProfile(false);
      setSelectedPage(null);
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [setOpenProfile, setSelectedPage]);

  /**
   * Handles user logout and redirects to the logout page.
   *
   * @param {React.SyntheticEvent} event - The triggering event.
   */
  const handleLogout = (event) => {
    event.stopPropagation();
    navigate("/logout");
  };

  return (
    <Drawer open={openProfile} onClose={handleClose} anchor="right">
      <Grid2 container sx={{ width: 430 }} role="presentation" padding={3}>
        {/* Close Button */}
        <Grid2 item size={5}>
          <ArrowBackIosIcon
            onClick={handleClose}
            sx={{ cursor: "pointer" }}
            aria-label="Close Profile"
            role="button"
            tabIndex={0}
          />
        </Grid2>

        {/* Profile Title */}
        <Grid2 item>
          <Typography color="text.secondary">Profile</Typography>
        </Grid2>
      </Grid2>

      <Grid2 container>
        <Grid2
          item
          size={12}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          padding={2}
        >
          <Avatar
            alt={authData?.name}
            src={authData?.picture}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Typography sx={{ color: "highlight" }}>{authData?.name}</Typography>
          <Typography sx={{ color: "highlight" }}>{authData?.email}</Typography>
        </Grid2>
      </Grid2>

      {/* Profile Menu Options */}
      <Grid2
        item
        sx={{
          borderRadius: 8,
          boxShadow: 5,
          height: "100vh",
          padding: 3,
          marginTop: 10,
        }}
      >
        <Box>
          <nav>
            <List>
              {/* Logout Option */}
              <ListItem disablePadding sx={{ mb: 2 }}>
                <ListItemButton onClick={handleLogout} aria-label="Logout">
                  <ListItemIcon>
                    <LogoutIcon
                      fontSize="large"
                      sx={{ color: "text.secondary" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </nav>
        </Box>
      </Grid2>
    </Drawer>
  );
};

/**
 * ProfileContent component propTypes
 */
ProfileContent.propTypes = {
  openProfile: PropTypes.bool.isRequired,
  setOpenProfile: PropTypes.func.isRequired,
  setSelectedPage: PropTypes.func.isRequired,
};

export default ProfileContent;
