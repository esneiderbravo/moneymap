import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

/**
 * AuthProvider Component
 * */
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const navigate = useNavigate();

  /**
   * Handle the Authentication
   * @param {string} credential - JWT credential
   * */
  const handleAuthentication = (credential) => {
    const userData = jwtDecode(credential);
    setAuthData(userData);
    navigate("/dashboard");
  };

  const value = {
    authData: authData,
    setAuthData: setAuthData,
    handleAuthentication: handleAuthentication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * AuthProvider propTypes
 * */
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuthContext = () => useContext(AuthContext);
