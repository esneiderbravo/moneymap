import React from "react";
import PropTypes from "prop-types";
import { Grid2, Typography } from "@mui/material";
import { getIconComponent } from "../../utils/common/icon";
import { setOpenSettings } from "../../actions/state";
import { useAppContext } from "../../providers/AppProvider";

/**
 * CommonHeaderContent Component
 *
 * A reusable header component with a back navigation icon and a title.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.handleClose - Callback function to handle closing action.
 * @param {string} props.title - Title text to display in the header.
 * @param {boolean} props.showSettings - Flag indicating whether the icon should be displayed.
 * @returns {React.JSX.Element} The rendered CommonHeaderContent component.
 */
const CommonHeader = ({ handleClose, title, showSettings = false }) => {
  const { dispatch } = useAppContext();
  // Dynamically get the back icon
  const ArrowBackIosIcon = getIconComponent("ArrowBackIos");
  const SettingsIcon = getIconComponent("Settings");

  return (
    <Grid2
      container
      size={12}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={3}
    >
      {/* Close Button */}
      {!showSettings ? (
        <Grid2 item size={1}>
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
      ) : (
        <Grid2 item size={1}></Grid2>
      )}

      {/* Title */}
      <Grid2 item padding={3} size={10} display="flex" justifyContent="center">
        <Typography color="text.primary">{title}</Typography>
      </Grid2>

      {/* Settings Icon */}
      {showSettings && SettingsIcon ? (
        <Grid2 item size={1} display={"flex"} alignItems={"center"}>
          <SettingsIcon
            onClick={() => {
              dispatch(setOpenSettings(true));
            }}
          />
        </Grid2>
      ) : (
        <Grid2 item size={1}></Grid2>
      )}
    </Grid2>
  );
};

/**
 * PropTypes for CommonHeaderContent
 */
CommonHeader.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  showSettings: PropTypes.bool,
};

export default CommonHeader;
