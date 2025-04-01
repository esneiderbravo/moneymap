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
import SettingsProfileContent from "./SettingsProfileContent";
import { getIconComponent } from "../../../utils/common/icon";
import CommonHeaderContent from "../../common/CommonHeaderContent";

const SettingsContent = () => {
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

  return (
    <>
      {/* Settings Drawer */}
      {!selectedPage ? (
        <Drawer
          open={openSettings}
          onClose={handleClose}
          anchor="right"
          disableAutoFocus
        >
          {/* Common Header */}
          <CommonHeaderContent handleClose={handleClose} title={"Settings"} />
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
      ) : null}

      {/* Profile Drawer */}
      {selectedPage === "profile" ? (
        <SettingsProfileContent setSelectedPage={setSelectedPage} />
      ) : null}
    </>
  );
};

export default SettingsContent;
