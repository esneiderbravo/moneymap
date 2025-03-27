import React from "react";
import { useAppContext } from "../../providers/AppProvider";
import GoogleSignInContent from "../../components/auth/GoogleSignInContent";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LocalStorage from "../../utils/localStorage";
import { setAuthData } from "../../actions/state";

/**
 * Google Sign In Container Component
 * @return React.JSX.Element
 * */
const GoogleSignInContainer = () => {
  const { language, setNotification, dispatch } = useAppContext();
  const navigate = useNavigate();

  /**
   * Handle the Google response
   * */
  const handleGoogleResponse = (response) => {
    const { credential } = response;
    if (credential) {
      const userData = jwtDecode(credential);
      const authData = {
        aud: userData.aud,
        azp: userData.azp,
        email: userData.email,
        email_verified: userData.email_verified,
        exp: userData.exp,
        iat: userData.iat,
        iss: userData.iss,
        jti: userData.jti,
        nbf: userData.nbf,
        name: userData.name,
        family_name: userData.family_name,
        given_name: userData.given_name,
        picture: userData.picture,
        sub: userData.sub,
      };
      LocalStorage.setItem("authData", JSON.stringify(authData));
      dispatch(setAuthData(authData));
      navigate("/dashboard");
      setNotification({
        type: "success",
        info: language["loginMessages"]["success"],
      });
    }
  };

  return <GoogleSignInContent handleGoogleResponse={handleGoogleResponse} />;
};

/**
 * Google Sign In Container propTypes
 * */
GoogleSignInContainer.propTypes = {};

export default GoogleSignInContainer;
