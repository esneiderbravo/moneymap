import React from "react";
import { Avatar, Grid2 } from "@mui/material";
import NotificationContent from "../notification/NotificationContent";
import { useAppContext } from "../../providers/AppProvider";

/**
 * Header Content Component
 * @returns {React.JSX.Element} Header section with notifications
 */
const HeaderContent = () => {
  const { state, notification } = useAppContext();
  const { authData } = state;
  return (
    <>
      {notification ? <NotificationContent /> : null}
      <Grid2 container spacing={2} mt={2}>
        {authData ? (
          <Grid2 item xs={12} display="flex" ml={1}>
            <Avatar alt={authData?.name} src={authData?.picture} />
          </Grid2>
        ) : null}
      </Grid2>
    </>
  );
};

/**
 * Header Content propTypes
 */
HeaderContent.propTypes = {};

export default HeaderContent;
