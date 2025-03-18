import React, { useMemo, useReducer } from "react";
import { initialState, reducer } from "../reducers/app";
import AppContext from "../contexts/app";
import App from "../components/App";

/**
 * App container
 */
const AppContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValues = useMemo(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  return (
    <AppContext.Provider value={contextValues}>
      <App />
    </AppContext.Provider>
  );
};

export default AppContainer;
