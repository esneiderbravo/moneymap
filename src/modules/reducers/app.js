import LocalStorage from "../utils/localStorage";

const notification = {
  info: null,
  type: null,
};

const authData = JSON.parse(LocalStorage.getItem("authData")) || null;

const currentPage = LocalStorage.getItem("currentPage") || "dashboard";

const openSettings = false;

const initialState = {
  notification,
  authData,
  currentPage,
  openSettings,
};

/**
 * Reducer function to manage application state changes.
 *
 * @param {Object} state - The current state of the application.
 * @param {Object} action - The dispatched action containing a type and optional payload.
 * @param {string} action.type - The action type (e.g., "setNotification").
 * @param {Object} action.payload - The new data to be merged into the state.
 * @returns {Object} The updated state based on the action type.
 * @throws {Error} Throws an error if the action type is invalid.
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "setNotification":
      return {
        ...state,
        notification: payload,
      };

    case "setAuthData":
      return {
        ...state,
        authData: payload,
      };

    case "setCurrentPage":
      return {
        ...state,
        currentPage: payload,
      };

    case "setOpenSettings":
      return {
        ...state,
        openSettings: payload,
      };

    default:
      throw new Error(`Invalid action type: ${type}`);
  }
};

export { initialState, reducer };
