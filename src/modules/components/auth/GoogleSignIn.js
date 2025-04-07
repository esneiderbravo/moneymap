import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";

/**
 * GoogleSignIn Content Component
 * @return React.JSX.Element
 * */
const GoogleSignIn = ({ handleGoogleResponse }) => {
  return (
    <GoogleLogin
      onSuccess={handleGoogleResponse}
      onFailure={handleGoogleResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
};

/**
 * GoogleSignIn Content propTypes
 * */
GoogleSignIn.propTypes = {
  handleGoogleResponse: PropTypes.func.isRequired,
};

export default GoogleSignIn;
