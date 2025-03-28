import React, { useContext, useReducer, useState } from "react";
import english from "../language/en_us.json";
import spanish from "../language/es_es.json";
import PropTypes from "prop-types";
import { initialState, reducer } from "../reducers/app";
import AppContext from "../contexts/app";

/**
 * Provides global application state and context to child components.
 * Includes language selection, notifications, and state management.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Components wrapped inside the provider.
 * @returns {JSX.Element} The provider with application-wide state.
 */
export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(english);
  const [notification, setNotification] = useState({ type: null, info: null });
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Handles language selection and updates the context.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The language change event.
   */
  const handleChangeLanguage = ({ target: { value } }) => {
    setLanguage(value === "es_es" ? spanish : english);
  };

  const value = {
    language,
    handleChangeLanguage,
    notification,
    setNotification,
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
