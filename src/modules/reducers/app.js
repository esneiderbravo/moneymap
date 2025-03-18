const notification = {
  hidden: true,
  message: "",
  type: "",
};

const localStorageAuthData =
  JSON.parse(localStorage.getItem("authData")) || null;

const authData = {
  name: localStorageAuthData?.name || "",
};

const initialState = {
  notification,
  authData,
};

/**
 * Reducer
 * @param {Object} state Reducer state. Ie, {notification: {...}, ...}
 * @param {Object} action Reducer action. Ie, {type: "showNotification", payload: {...}}
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "hideNotification":
      return { ...state, ...payload };

    case "setNotification":
      return { ...state, ...payload };

    case "setAuthData":
      return { ...state, ...payload };

    default:
      throw new Error("No valid action");
  }
};

export { initialState, reducer };
