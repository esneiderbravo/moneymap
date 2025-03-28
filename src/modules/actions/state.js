/**
 * Utility function to create an action object.
 * @param {string} type - The type of action.
 * @param {string} key - The key for the payload data.
 * @param {any} data - The data to be stored in the payload.
 * @returns {Object} Redux action object.
 */
const createAction = (type, key, data) => ({
  type,
  payload: {
    [key]: data,
  },
});

/**
 * Set authentication data.
 * @param {Object} authData - Authentication details.
 * @returns {Object} Action object for setting authentication data.
 */
const setAuthData = (authData) =>
  createAction("setAuthData", "authData", authData);

export { setAuthData };
