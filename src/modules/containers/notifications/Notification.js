import React, { useContext } from "react";
import Notification from "../../components/notifications/Notification";
import AppContext from "../../contexts/app";
import { hideNotification } from "../../actions/notification";

/**
 * Notification container component
 */
const NotificationContainer = () => {
  const [state, dispatch] = useContext(AppContext);

  const onClickClose = () => {
    dispatch(hideNotification());
  };

  return <Notification {...state.notification} onClickClose={onClickClose} />;
};

export default NotificationContainer;
