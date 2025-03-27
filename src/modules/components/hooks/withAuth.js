import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAppContext } from "../../providers/AppProvider";

/**
 * WithAuth - Validate if has token
 * @param {children} React Router Object
 */
const WithAuth = ({ children }) => {
  let location = useLocation();
  const { state } = useAppContext();
  const { authData } = state;

  if (authData) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

WithAuth.propTypes = {
  children: PropTypes.any,
};

export default WithAuth;
