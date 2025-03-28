import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAppContext } from "../../providers/AppProvider";

/**
 * WithAuth - Higher-order component for authentication validation.
 * Redirects unauthenticated users to the login page.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to render if authenticated.
 * @returns {React.JSX.Element} - Authenticated content or a redirect.
 */
const WithAuth = ({ children }) => {
  const location = useLocation();
  const { state } = useAppContext();
  const { authData } = state;

  return authData ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

/**
 * PropTypes for WithAuth
 */
WithAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WithAuth;
