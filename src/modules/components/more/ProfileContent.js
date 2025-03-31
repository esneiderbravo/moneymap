import React from "react";
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
import useSwipeClose from "../hooks/swipe";
import { ProfileOptionsContainer } from "../../styles/more/ProfileContent.styled";

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

  useSwipeClose({
    isOpen: openProfile,
    onClose: () => {
      setOpenProfile(false);
      setSelectedPage(null);
    },
  });
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
      <Grid2
        container
        size={12}
        sx={{ width: "auto" }}
        role="presentation"
        padding={3}
      >
        {/* Close Button */}
        <Grid2 item size={1}>
          <ArrowBackIosIcon
            onClick={handleClose}
            sx={{ cursor: "pointer" }}
            aria-label="Close Profile"
            role="button"
            tabIndex={0}
          />
        </Grid2>

        {/* Profile Title */}
        <Grid2 item size={10} display="flex" justifyContent="center">
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
      <ProfileOptionsContainer item sx={{ backgroundColor: "primary.main" }}>
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
      </ProfileOptionsContainer>
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
