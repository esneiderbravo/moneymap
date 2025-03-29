import React from "react";
import { Avatar, Grid2 } from "@mui/material";
import NotificationContent from "../notification/NotificationContent";
import { useAppContext } from "../../providers/AppProvider";
import { useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { setOpenSettings } from "../../actions/state";

/**
 * Header Content Component
 * @returns {React.JSX.Element} Header section with notifications
 */
const HeaderContent = () => {
  const { state, dispatch } = useAppContext();
  const { authData, notification } = state;
  const { type, info } = notification;
  const location = useLocation();
  const isPrimaryRoute = location.pathname === "/";
  const isMoreRoute = location.pathname === "/more";

  return (
    <>
      {type && info ? <NotificationContent /> : null}
      <Grid2 container spacing={2} mt={2} mb={4}>
        {authData && !isPrimaryRoute ? (
          <>
            <Grid2
              item
              size={9.5}
              display={"flex"}
              alignItems={"center"}
              ml={3}
            >
              <Avatar alt={authData?.name} src={authData?.picture} />
            </Grid2>
            {isMoreRoute ? (
              <Grid2 item size={1} display={"flex"} alignItems={"center"}>
                <SettingsIcon
                  onClick={() => {
                    dispatch(setOpenSettings(true));
                  }}
                />
              </Grid2>
            ) : null}
          </>
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
