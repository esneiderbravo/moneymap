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

export { setAuthData, setCurrentPage, setMoreCurrentPage };
