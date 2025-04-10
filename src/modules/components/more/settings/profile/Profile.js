import React, { useState } from "react";
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
import { useAppContext } from "../../../../providers/AppProvider";
import { getIconComponent } from "../../../../utils/common/icon";
import CommonHeader from "../../../common/CommonHeader";
import { ProfileOptionsContainer } from "../../../../styles/more/settings/profile/Profile.styled";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import useSwipeClose from "../../../hooks/useSwipeClose";

/**
 * ProfileContent Component
 * Displays the user's profile menu, allowing navigation and logout.
 *
 * @param {Object} props - Component properties.
 * @param {Boolean} props.openProfile - Boolean indicating that the component is open.
 * @param {Function} props.handleClose - Function to reset the selected page when closing.
 * @returns {React.JSX.Element} The rendered ProfileContent component.
 */
const Profile = ({ openProfile, handleClose }) => {
  const { t } = useTranslation("profile");
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { authData } = state;
  const [openLanguageModal, setOpenLanguageModal] = useState(false);

  // Dynamically get the icons
  const LogoutIcon = getIconComponent("Logout");
  const LanguageIcon = getIconComponent("Language");

  /**
   * Handles user logout and redirects to the logout page.
   *
   * @param {React.SyntheticEvent} event - The triggering event.
   */
  const handleLogout = (event) => {
    event.stopPropagation();
    navigate("/logout");
  };

  useSwipeClose({
    isOpen: openProfile,
    onClose: (event) => handleClose(event),
  });

  return (
    <>
      <Drawer
        open={openProfile}
        onClose={handleClose}
        anchor="bottom"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        {/* Common Header */}
        <CommonHeader handleClose={handleClose} title={t("title")} />

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
            <Typography sx={{ color: "highlight" }}>
              {authData?.name}
            </Typography>
            <Typography sx={{ color: "highlight" }}>
              {authData?.email}
            </Typography>
          </Grid2>
        </Grid2>

        {/* Profile Menu Options */}
        <ProfileOptionsContainer
          item
          sx={{ backgroundColor: "secondary.main" }}
        >
          <Box component="nav">
            <List>
              {/* Change Language */}
              <ListItem disablePadding sx={{ mb: 2 }}>
                <ListItemButton
                  onClick={() => setOpenLanguageModal(true)}
                  aria-label="Change language"
                >
                  <ListItemIcon>
                    {LanguageIcon && (
                      <LanguageIcon
                        fontSize="large"
                        sx={{ color: "text.secondary" }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={t("language")} />
                </ListItemButton>
              </ListItem>
              <Divider />
              {/* Logout Option */}
              <ListItem disablePadding sx={{ mb: 2, mt: 2 }}>
                <ListItemButton onClick={handleLogout} aria-label="Logout">
                  <ListItemIcon>
                    {LogoutIcon && (
                      <LogoutIcon
                        fontSize="large"
                        sx={{ color: "text.secondary" }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={t("logout")} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </Box>
        </ProfileOptionsContainer>
      </Drawer>
      <LanguageSwitcher
        open={openLanguageModal}
        setOpen={setOpenLanguageModal}
      />
    </>
  );
};

/**
 * ProfileContent component propTypes
 */
Profile.propTypes = {
  openProfile: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Profile;
