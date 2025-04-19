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
import { useTranslation } from "react-i18next";
import useSwipeClose from "../../hooks/useSwipeClose";

const Settings = () => {
  const { t } = useTranslation("settings");
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

  useSwipeClose({
    isOpen: openSettings,
    onClose: (event) => handleClose(event),
  });

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
        <CommonHeader handleClose={handleClose} title={t("title")} />
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
                  primary={
                    <Typography variant="body1" sx={{ color: "text.primary" }}>
                      {t("profile")}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.info", display: "inline" }}
                    >
                      {t("profile_description")}
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
                  primary={
                    <Typography variant="body1" sx={{ color: "text.primary" }}>
                      {t("preferences")}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.info", display: "inline" }}
                    >
                      {t("preferences_description")}
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
