import LocalStorage from "../utils/localStorage";

const notification = {
  hidden: true,
  message: "",
  type: "",
};

const authData = JSON.parse(LocalStorage.getItem("authData")) || null;

const currentPage = LocalStorage.getItem("currentPage") || "dashboard";

const moreCurrentPage = LocalStorage.getItem("moreCurrentPage") || "Manage";

const initialState = {
  notification,
  authData,
  currentPage,
  moreCurrentPage,
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
    case "hideNotification":
      return {
        ...state,
        notification: { ...state.notification, hidden: true },
      };

    case "setNotification":
      return {
        ...state,
        notification: { ...state.notification, ...payload, hidden: false },
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

    case "setMoreCurrentPage":
      return {
        ...state,
        moreCurrentPage: payload,
      };

    default:
      throw new Error(`Invalid action type: ${type}`);
  }
};

export { initialState, reducer };
