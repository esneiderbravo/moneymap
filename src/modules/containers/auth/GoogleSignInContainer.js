import React from "react";
import { useAppContext } from "../../providers/AppProvider";
import GoogleSignInContent from "../../components/auth/GoogleSignInContent";
import { useAuthContext } from "../../providers/AuthProvider";

/**
 * Google Sign In Container Component
 * @return React.JSX.Element
 * */
const GoogleSignInContainer = () => {
  const { language, setNotification } = useAppContext();
  const { handleAuthentication } = useAuthContext();

  /**
   * Handle the Google response
   * */
  const handleGoogleResponse = (response) => {
    const { credential } = response;
    if (credential) {
      setNotification({
        type: "success",
        info: language["loginMessages"]["success"],
      });
      handleAuthentication(credential);
    }
  };

  return <GoogleSignInContent handleGoogleResponse={handleGoogleResponse} />;
};

/**
 * Google Sign In Container propTypes
 * */
GoogleSignInContainer.propTypes = {};

export default GoogleSignInContainer;
