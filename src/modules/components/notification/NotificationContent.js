import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { useAppContext } from "../../providers/AppProvider";

/**
 * Notification Content Component
 * @return React.JSX.Element
 * */
const NotificationContent = () => {
  const [type, setType] = useState("");
  const [info, setInfo] = useState("");
  const { notification } = useAppContext();

  /**
   *  Success notification element generator
   *  @return React.JSX.Element
   */
  const successNotification = () => {
    return (
      <Alert severity="success" sx={{ width: "20%" }}>
        {info}
      </Alert>
    );
  };

  /**
   *  Error notification element generator
   *  @return React.JSX.Element
   * */
  const errorNotification = () => {
    return <Alert severity="error">{info}</Alert>;
  };

  /**
   *  Warning notification element generator
   *  @return React.JSX.Element
   * */
  const warningNotification = () => {
    return <Alert severity="warning">{info}</Alert>;
  };

  /**
   *  Info notification element generator
   *  @return React.JSX.Element
   * */
  const infoNotification = () => {
    return <Alert severity="info">{info}</Alert>;
  };

  useEffect(() => {
    setType(notification.type);
    setInfo(notification.info);
    const timeoutId = setTimeout(() => {
      setType(null);
      setInfo(null);
      clearTimeout(timeoutId);
    }, 5000);
  }, [notification]);

  switch (type) {
    case "success":
      return successNotification();
    case "error":
      return errorNotification();
    case "warning":
      return warningNotification();
    case "info":
      return infoNotification();
    default:
      return null;
  }
};

/**
 *  NotificationContent propTypes
 */
NotificationContent.propTypes = {};

export default NotificationContent;
