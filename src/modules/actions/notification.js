/**
 * Hide notification
 */
const hideNotification = () => ({
  type: "hideNotification",
  payload: {
    notification: {
      hidden: true,
      message: "",
      type: "",
    },
  },
});

/**
 * Show notification error
 * @param {Object} payload Notification data. Ie, {
 *      message: {String} content displayed in the notification
 *      closingTime: {Integer} time in milliseconds to close/hide the component
 *   }
 */
const setNotificationError = ({
  message,
  closingTime,
  alertWidth = "35%",
  horizontalPosition = "center",
}) => ({
  type: "setNotification",
  payload: {
    notification: {
      closingTime,
      hidden: false,
      message,
      type: "error",
      alertWidth,
      horizontalPosition,
    },
  },
});

/**
 * Show notification success
 * @param {Object} payload Notification data. Ie, {
 *      message: {String} content displayed in the notification
 *      closingTime: {Integer} time in milliseconds to close/hide the component
 *   }
 */
const setNotificationSuccess = ({
  message,
  closingTime,
  alertWidth = "35%",
  horizontalPosition = "center",
}) => ({
  type: "setNotification",
  payload: {
    notification: {
      closingTime,
      hidden: false,
      message,
      type: "success",
      alertWidth,
      horizontalPosition,
    },
  },
});

/**
 * Show notification warning
 * @param {Object} payload Notification data. Ie, {
 *      message: {String} content displayed in the notification
 *      closingTime: {Integer} time in milliseconds to close/hide the component
 *   }
 */
const setNotificationWarning = ({
  message,
  closingTime,
  alertWidth = "35%",
  horizontalPosition = "center",
}) => ({
  type: "setNotification",
  payload: {
    notification: {
      closingTime,
      hidden: false,
      message,
      type: "warning",
      alertWidth,
      horizontalPosition,
    },
  },
});

export {
  hideNotification,
  setNotificationError,
  setNotificationSuccess,
  setNotificationWarning,
};
