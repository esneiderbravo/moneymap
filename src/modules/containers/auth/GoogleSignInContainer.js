import React from "react";
import { useAppContext } from "../../providers/AppProvider";
import GoogleSignInContent from "../../components/auth/GoogleSignInContent";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LocalStorage from "../../utils/localStorage";
import { setAuthData } from "../../actions/state";

/**
 * Google Sign-In Container Component
 *
 * This component handles Google OAuth authentication. When the user logs in with Google:
 * - The JWT credential is decoded.
 * - Authentication data is stored in local storage and the global state.
 * - The user is redirected to the dashboard.
 * - A success or error notification is displayed.
 *
 * @returns {React.JSX.Element} The Google sign-in component.
 */
const GoogleSignInContainer = () => {
  const { language, setNotification, dispatch } = useAppContext();
  const navigate = useNavigate();

  /**
   * Handles the authentication response from Google.
   *
   * - Extracts and decodes the JWT credential.
   * - Stores authentication details in local storage and global state.
   * - Redirects the user to the dashboard upon successful login.
   * - Displays appropriate notifications for success or failure.
   *
   * @param {Object} response - The response object from Google's authentication API.
   * @param {string} response.credential - The JWT token containing user details.
   */
  const handleGoogleResponse = (response) => {
    try {
      const { credential } = response;
      if (!credential) throw new Error("No credential received");

      // Decode JWT token
      const userData = jwtDecode(credential);
      if (!userData) throw new Error("Invalid token");

      // Extract relevant authentication data
      const {
        aud,
        azp,
        email,
        email_verified,
        exp,
        iat,
        iss,
        jti,
        nbf,
        name,
        family_name,
        given_name,
        picture,
        sub,
      } = userData;

      const authData = {
        aud,
        azp,
        email,
        email_verified,
        exp,
        iat,
        iss,
        jti,
        nbf,
        name,
        family_name,
        given_name,
        picture,
        sub,
      };

      // Store authentication data
      LocalStorage.setItem("authData", JSON.stringify(authData));
      dispatch(setAuthData(authData));

      // Navigate to the dashboard
      navigate("/dashboard");

      // Display success notification
      setNotification({
        type: "success",
        info:
          language?.notifications?.login ||
          "You have been logged in successfully.",
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setNotification({
        type: "error",
        info: "Failed to authenticate with Google. Please try again.",
      });
    }
  };

  return <GoogleSignInContent handleGoogleResponse={handleGoogleResponse} />;
};

export default GoogleSignInContainer;
