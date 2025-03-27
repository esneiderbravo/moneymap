import React, { createContext, useContext, useState } from "react";
import english from "../language/en_us.json";
import spanish from "../language/es_es.json";
import PropTypes from "prop-types";

const AppContext = createContext();

/**
 * AppProvider component
 * @param {JSX.Element} children - component to render with application context
 * @return {JSX.Element} - component to render with application
 * */
export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(english);
  const [notification, setNotification] = useState({
    type: null,
    info: null,
  });

  /**
   * Handle language change events
   * @param {EventTarget} event - event with language change target.
   * **/
  const handleChangeLanguage = (event) => {
    const languageSelected = event.target.value;
    switch (languageSelected) {
      case "en_us":
        setLanguage(english);
        break;
      case "es_es":
        setLanguage(spanish);
        break;
      default:
        setLanguage(english);
        break;
    }
  };

  const value = {
    handleChangeLanguage: handleChangeLanguage,
    language: language,
    notification: notification,
    setNotification: setNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export const useAppContext = () => useContext(AppContext);
