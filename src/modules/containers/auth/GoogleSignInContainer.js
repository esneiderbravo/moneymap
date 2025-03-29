import React from "react";
import { useAppContext } from "../../providers/AppProvider";
import GoogleSignInContent from "../../components/auth/GoogleSignInContent";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LocalStorage from "../../utils/localStorage";
import { setAuthData } from "../../actions/state";
import { loginService } from "../../services/auth/authService";
import {
  LOGIN_ERROR_MESSAGE,
  LOGIN_SUCCESS_MESSAGE,
} from "../../utils/constants";

/**
 * Google Sign-In Container Component
 *
 * Handles Google OAuth authentication:
 * - Decodes the JWT credential.
 * - Stores authentication details in local storage and the global state.
 * - Creates the user in the local database if they do not exist.
 * - Redirects the user to the dashboard.
 * - Displays success or error notifications.
 *
 * @returns {React.JSX.Element} The Google sign-in component.
 */
const GoogleSignInContainer = () => {
  const { language, setNotification, dispatch } = useAppContext();
  const navigate = useNavigate();

  /**
   * Handles the authentication response from Google.
   *
   * @param {Object} response - Response object from Google's authentication API.
   * @param {string} response.credential - The JWT token containing user details.
   */
  const handleGoogleResponse = async (response) => {
    try {
      const { credential } = response;
      if (!credential) throw new Error("No credential received");

      // Decode JWT token
      const userData = jwtDecode(credential);
      if (!userData) throw new Error("Invalid token");

      // Extract relevant authentication data
      const {
        email,
        email_verified,
        name,
        family_name,
        given_name,
        picture,
        sub,
      } = userData;
      const authData = {
        email,
        email_verified,
        name,
        family_name,
        given_name,
        picture,
        sub,
      };

      const { data, success } = await loginService(authData);
      if (!success) throw new Error("Login service failed");

      // Store authentication data and update global state
      LocalStorage.setItem("authData", JSON.stringify(data));
      dispatch(setAuthData(data));

      // Redirect user to dashboard
      navigate("/dashboard");

      // Show success notification
      setNotification({
        type: "success",
        info: language?.notifications?.login || LOGIN_SUCCESS_MESSAGE,
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setNotification({
        type: "error",
        info: LOGIN_ERROR_MESSAGE,
      });
    }
  };

  return <GoogleSignInContent handleGoogleResponse={handleGoogleResponse} />;
};

export default GoogleSignInContainer;
