import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthData, setNotification } from "../../actions/state";
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
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage and reset global state
    const resetStateData = () => {
      LocalStorage.clear();
      dispatch(setAuthData(null));
    };
    resetStateData();
    // Redirect to the homepage
    navigate("/");

    // Display logout success notification
    dispatch(
      setNotification({
        type: "success",
        info: "You have been logged out successfully.",
      })
    );
  }, [dispatch, navigate]);

  return null;
};

export default LogoutContainer;
