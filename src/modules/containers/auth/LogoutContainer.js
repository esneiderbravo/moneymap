import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../../actions/state";
import { useAppContext } from "../../providers/AppProvider";
import LocalStorage from "../../utils/localStorage";

/**
 * LogoutContainer Component
 *
 * This component handles user logout by:
 * - Clearing authentication data from local storage.
 * - Resetting the global authentication state.
 * - Redirecting the user to the homepage.
 * - Displaying a logout success notification.
 *
 * @returns {null} This component does not render any UI.
 */
const LogoutContainer = () => {
  const { language, setNotification, dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    LocalStorage.removeItem("authData");
    dispatch(setAuthData(null));

    // Redirect to the homepage
    navigate("/");

    // Display logout success notification
    setNotification({
      type: "success",
      info:
        language?.notifications?.logout ||
        "You have been logged out successfully.",
    });
  }, [dispatch, navigate, setNotification, language]);

  return null;
};

export default LogoutContainer;
