import { Grid } from "@mui/material";
import NotificationContent from "../notification/NotificationContent";
import React from "react";

/**
 * Header Content Component
 * @return React.JSX.Element
 * */
const HeaderContent = () => {
  return (
    <Grid container spacing={2} display="flex">
      <Grid
        item
        xs={12}
        md={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <NotificationContent />
      </Grid>
    </Grid>
  );
};

/**
 * Footer Content propTypes
 * */
HeaderContent.propTypes = {};

export default HeaderContent;
