import React, { useState } from "react";
import { Avatar, Grid2 } from "@mui/material";
import Notification from "../notification/Notification";
import { useAppContext } from "../../providers/AppProvider";
import { useLocation } from "react-router-dom";
import Profile from "../more/settings/profile/Profile";

/**
 * Header Content Component
 * @returns {React.JSX.Element} Header section with notifications
 */
const Header = () => {
  const { state } = useAppContext();
  const { authData, notification } = state;
  const { type, info } = notification;
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";
  const [openProfile, setOpenProfile] = useState(false);

  /**
   * Handles closing the profile drawer.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleCloseProfile = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    setOpenProfile(false);
  };

  return (
    <>
      {type && info ? <Notification /> : null}
      {authData && isDashboardRoute ? (
        <>
          <Grid2 container spacing={2} mt={2} mb={4}>
            <Grid2
              item
              size={9.5}
              display={"flex"}
              alignItems={"center"}
              ml={3}
            >
              <Avatar
                alt={authData?.name}
                src={authData?.picture}
                onClick={() => setOpenProfile(true)}
              />
            </Grid2>
          </Grid2>
          <Profile openProfile={openProfile} handleClose={handleCloseProfile} />
        </>
      ) : null}
    </>
  );
};

/**
 * Header Content propTypes
 */
Header.propTypes = {};

export default Header;
