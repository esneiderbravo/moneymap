import React from "react";
import PropTypes from "prop-types";
import { Grid2, Typography } from "@mui/material";
import { getIconComponent } from "../../utils/common/icon";

/**
 * CommonHeaderContent Component
 *
 * A reusable header component with a back navigation icon and a title.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.handleClose - Callback function to handle closing action.
 * @param {string} props.title - Title text to display in the header.
 * @returns {React.JSX.Element} The rendered CommonHeaderContent component.
 */
const CommonHeaderContent = ({ handleClose, title }) => {
  // Dynamically get the back icon
  const ArrowBackIosIcon = getIconComponent("ArrowBackIos");

  return (
    <Grid2 container size={12} sx={{ width: "auto" }} role="presentation">
      {/* Close Button */}
      <Grid2 item padding={3} size={1}>
        {ArrowBackIosIcon && (
          <ArrowBackIosIcon
            onClick={handleClose}
            sx={{ cursor: "pointer" }}
            aria-label="Close Settings"
            role="button"
            tabIndex={0}
          />
        )}
      </Grid2>

      {/* Title */}
      <Grid2 item padding={3} size={10} display="flex" justifyContent="center">
        <Typography color="text.secondary">{title}</Typography>
      </Grid2>
    </Grid2>
  );
};

/**
 * PropTypes for CommonHeaderContent
 */
CommonHeaderContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default CommonHeaderContent;
