import React, { useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { initialState, reducer } from "../reducers/app";
import AppContext from "../contexts/app";

/**
 * Provides global application state and context to child components.
 * Includes notifications, and state management.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Components wrapped inside the provider.
 * @returns {JSX.Element} The provider with application-wide state.
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to access the application context.
 *
 * @returns {Object} The application context value.
 */
export const useAppContext = () => useContext(AppContext);
