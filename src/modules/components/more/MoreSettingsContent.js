import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Drawer,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppContext } from "../../providers/AppProvider";
import { setOpenSettings } from "../../actions/state";
import MoreProfileContent from "./MoreProfileContent";
import useSwipeClose from "../hooks/swipe";
import { getIconComponent } from "../../utils/common/icon";

/**
 * SettingsContent Component
 *
 * Renders a settings drawer that provides user configuration options.
 * Includes options such as "Profile" and "Preferences".
 * Also manages the opening of the ProfileContent drawer.
 *
 * @returns {React.JSX.Element} Full-screen settings menu
 */
const MoreSettingsContent = () => {
  const { state, dispatch } = useAppContext();
  const { openSettings, authData } = state;
  const [selectedPage, setSelectedPage] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  // Dynamically get the icons
  const ArrowBackIosIcon = getIconComponent("ArrowBackIos");
  const AccountCircleIcon = getIconComponent("AccountCircle");

  useSwipeClose({
    isOpen: openSettings,
    onClose: () => {
      document.activeElement?.blur();
      dispatch(setOpenSettings(false));
    },
  });

  /**
   * Opens the profile drawer when "Profile" is selected.
   */
  useEffect(() => {
    if (selectedPage === "profile") {
      setOpenProfile(true);
    }
  }, [selectedPage]);

  /**
   * Handles closing the settings drawer.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleCloseSettings = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    dispatch(setOpenSettings(false));
  };

  return (
    <>
      {/* Settings Drawer */}
      <Drawer
        open={openSettings}
        onClose={handleCloseSettings}
        anchor="right"
        disableAutoFocus
      >
        <Box sx={{ width: "auto" }} role="presentation" padding={3}>
          <Grid2 container size={12} alignItems="center" spacing={2}>
            {/* Close Button */}
            <Grid2 item size={1}>
              {ArrowBackIosIcon && (
                <ArrowBackIosIcon
                  onClick={handleCloseSettings}
                  sx={{ cursor: "pointer" }}
                  aria-label="Close Settings"
                />
              )}
            </Grid2>
            <Grid2 item size={10} display="flex" justifyContent="center">
              <Typography color="text.secondary">Settings</Typography>
            </Grid2>
          </Grid2>

          {/* Settings Navigation */}
          <nav>
            <List>
              {/* Profile Option */}
              <ListItem disablePadding>
                <ListItemButton onClick={() => setSelectedPage("profile")}>
                  <ListItemIcon>
                    <Avatar alt={authData?.name} src={authData?.picture} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Profile"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.info", display: "inline" }}
                      >
                        {"Complete your registration..."}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>

              {/* Preferences Option */}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {AccountCircleIcon && (
                      <AccountCircleIcon
                        fontSize="large"
                        sx={{ color: "text.secondary" }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary="Preferences"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.info", display: "inline" }}
                      >
                        {
                          "Currency, Appearance, Show calculator, Show Expanded..."
                        }
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>

      {/* Profile Drawer */}
      <MoreProfileContent
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        setSelectedPage={setSelectedPage}
      />
    </>
  );
};

export default MoreSettingsContent;
