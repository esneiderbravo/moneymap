import React from "react";
import { Grid2 } from "@mui/material";
import NotificationContent from "../notification/NotificationContent";

/**
 * Header Content Component
 * @returns {React.JSX.Element} Header section with notifications
 */
const HeaderContent = () => {
  return (
    <Grid2 container spacing={2} justifyContent="center">
      <Grid2 item xs={12}>
        <NotificationContent />
      </Grid2>
    </Grid2>
  );
};

/**
 * Header Content propTypes
 */
HeaderContent.propTypes = {};

export default HeaderContent;
