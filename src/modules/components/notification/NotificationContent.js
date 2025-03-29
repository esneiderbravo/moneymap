import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { useAppContext } from "../../providers/AppProvider";
import { BoxContent } from "../../styles/notification/NotificationContent.styled";

/**
 * Notification Content Component.
 * Displays different types of notifications based on context state.
 *
 * @returns {React.JSX.Element|null} The rendered notification component or null if no notification is set.
 */
const NotificationContent = () => {
  const [type, setType] = useState(null);
  const [info, setInfo] = useState(null);
  const { notification, setNotification } = useAppContext();

  useEffect(() => {
    if (notification?.type && notification?.info) {
      setType(notification.type);
      setInfo(notification.info);

      const timeoutId = setTimeout(() => {
        setType(null);
        setInfo(null);
        setNotification(null);
      }, 2000);

      return () => clearTimeout(timeoutId); // Cleanup function to avoid memory leaks
    }
  }, [notification, setNotification]);

  /**
   * Renders a notification based on the type.
   *
   * @param {string} severity - The type of the notification (success, error, warning, info).
   * @returns {React.JSX.Element} The Alert component.
   */
  const renderNotification = (severity) => (
    <BoxContent>
      <Alert severity={severity} variant="filled">
        {info}
      </Alert>
    </BoxContent>
  );

  if (!type) return null; // Don't render anything if there's no active notification

  return renderNotification(type);
};

export default NotificationContent;
