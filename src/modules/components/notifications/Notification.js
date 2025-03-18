import React from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppContext from "../../contexts/app";

/**
 * Notification presentational component
 * @param {props} props. Ie, {hidden: true, ...}
 */
const Notification = ({ onClickClose }) => {
  const [state] = React.useContext(AppContext);
  const { notification } = state;
  const closingTime = notification?.closingTime || 10000;
  const alertWidth = notification?.alertWidth || "30%";
  const horizontalPosition = notification?.horizontalPosition || "center";

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClickClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return notification?.type ? (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: horizontalPosition }}
      sx={{ width: { xs: "100%", md: alertWidth }, margin: "auto" }}
      open={!notification.hidden}
      autoHideDuration={typeof closingTime === "number" ? closingTime : null}
      onClose={onClickClose}
      action={action}
    >
      <Alert onClose={onClickClose} severity={notification?.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  ) : null;
};

Notification.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  closingTime: PropTypes.number,
};

export default Notification;
