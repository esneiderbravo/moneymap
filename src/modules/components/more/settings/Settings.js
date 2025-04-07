import React, { useState } from "react";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppContext } from "../../../providers/AppProvider";
import { setOpenSettings } from "../../../actions/state";
import Profile from "./profile/Profile";
import { getIconComponent } from "../../../utils/common/icon";
import CommonHeader from "../../common/CommonHeader";

const Settings = () => {
  const { state, dispatch } = useAppContext();
  const { openSettings, authData } = state;
  const [selectedPage, setSelectedPage] = useState(null);

  // Dynamically get the icons
  const AccountCircleIcon = getIconComponent("AccountCircle");

  /**
   * Handles closing the settings drawer.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleClose = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    dispatch(setOpenSettings(false));
  };

  /**
   * Handles closing the settings drawer.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleCloseSelectedPage = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    dispatch(setOpenSettings(true));
    setSelectedPage(null);
  };

  return (
    <>
      {/* Settings Drawer */}

      <Drawer
        open={openSettings}
        onClose={handleClose}
        anchor="right"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        {/* Common Header */}
        <CommonHeader handleClose={handleClose} title={"Settings"} />
        <Box component="nav" sx={{ width: "auto" }} padding={3}>
          {/* Settings Navigation */}
          <List>
            {/* Profile Option */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  dispatch(setOpenSettings(false));
                  setSelectedPage("profile");
                }}
              >
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
        </Box>
      </Drawer>

      {/* Profile Drawer */}
      <Profile
        openProfile={selectedPage === "profile"}
        handleClose={handleCloseSelectedPage}
      />
    </>
  );
};

export default Settings;
