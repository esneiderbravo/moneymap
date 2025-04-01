const setNotification = (notification) => ({
  type: "setNotification",
  payload: notification,
});

/**
 * Action creator for setting authentication data.
 * @param {Object} authData - Authentication details, including user information and tokens.
 * @returns {Object} Redux action object with type "setAuthData" and the provided payload.
 */
const setAuthData = (authData) => ({
  type: "setAuthData",
  payload: authData,
});

/**
 * Action creator for setting the current page.
 * @param {string} currentPage - The name or identifier of the current page.
 * @returns {Object} Redux action object with type "setCurrentPage" and the provided payload.
 */
const setCurrentPage = (currentPage) => ({
  type: "setCurrentPage",
  payload: currentPage,
});

/**
 * Action creator for setting the current page in the "More" section.
 * @param {string} moreCurrentPage - The name or identifier of the current page in the "More" section.
 * @returns {Object} Redux action object with type "setMoreCurrentPage" and the provided payload.
 */
const setMoreCurrentPage = (moreCurrentPage) => ({
  type: "setMoreCurrentPage",
  payload: moreCurrentPage,
});

/**
 * Action creator for toggling the settings drawer.
 *
 * @param {boolean} openSettings - Indicates whether the settings drawer should be open (true) or closed (false).
 * @returns {Object} Redux action object with type "setOpenSettings" and the new state as payload.
 */
const setOpenSettings = (openSettings) => ({
  type: "setOpenSettings",
  payload: openSettings,
});

/**
 * Creates an action to update the user's balances.
 *
 * @param {Object} balance - The new balance data to be set.
 * @returns {Object} The action object containing the type and payload.
 */
const setBalance = (balance) => {
  return {
    type: "setBalance",
    payload: balance,
  };
};

export {
  setNotification,
  setAuthData,
  setCurrentPage,
  setMoreCurrentPage,
  setOpenSettings,
  setBalance,
};
