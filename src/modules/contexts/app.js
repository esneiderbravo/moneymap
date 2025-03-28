import React from "react";

/**
 * Application Context
 *
 * This context provides a global state management solution for the application.
 * It allows different components to access and update shared state without prop drilling.
 *
 * @type {React.Context}
 */
const AppContext = React.createContext(null);

export default AppContext;
