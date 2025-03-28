/**
 * Set authentication data.
 * @param {Object} authData - Authentication details.
 * @returns {Object} Action object for setting authentication data.
 */
const setAuthData = (authData) => ({
  type: "setAuthData",
  payload: authData,
});

export { setAuthData };
