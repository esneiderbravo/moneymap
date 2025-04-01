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
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../providers/AppProvider";
import { getIconComponent } from "../../../utils/common/icon";
import CommonHeaderContent from "../../common/CommonHeaderContent";
import { setOpenSettings } from "../../../actions/state";
import { SettingsProfileOptionsContainer } from "../../../styles/more/settings/SettingsProfileContent.styled";

/**
 * ProfileContent Component
 * Displays the user's profile menu, allowing navigation and logout.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.setSelectedPage - Function to reset the selected page when closing.
 * @returns {React.JSX.Element} The rendered ProfileContent component.
 */
const SettingsProfileContent = ({ setSelectedPage }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { authData } = state;
  const openProfile = true;

  // Dynamically get the icons
  const LogoutIcon = getIconComponent("Logout");

  /**
   * Handles closing the profile drawer.
   * Removes focus before closing to avoid accessibility issues.
   *
   * @param {React.SyntheticEvent} event - The triggering event.
   */
  const handleClose = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    setSelectedPage(null);
    dispatch(setOpenSettings(true));
  };

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
    <Drawer
      open={openProfile}
      onClose={handleClose}
      anchor="right"
      disableAutoFocus
    >
      {/* Common Header */}
      <CommonHeaderContent handleClose={handleClose} title={"Profile"} />

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
      <SettingsProfileOptionsContainer
        item
        sx={{ backgroundColor: "primary.main" }}
      >
        <Box component="nav">
          <List>
            {/* Logout Option */}
            <ListItem disablePadding sx={{ mb: 2 }}>
              <ListItemButton onClick={handleLogout} aria-label="Logout">
                <ListItemIcon>
                  {LogoutIcon && (
                    <LogoutIcon
                      fontSize="large"
                      sx={{ color: "text.secondary" }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </SettingsProfileOptionsContainer>
    </Drawer>
  );
};

/**
 * ProfileContent component propTypes
 */
SettingsProfileContent.propTypes = {
  setSelectedPage: PropTypes.func.isRequired,
};

export default SettingsProfileContent;
