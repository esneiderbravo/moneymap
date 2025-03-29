import LocalStorage from "./localStorage";
import HTTP from "./http";

/**
 * HTTPHandler class - Wrapper for API calls with local storage token handling.
 */
class HTTPHandler {
  /**
   * GET request
   * @param {String} url - Request URL.
   * @param {Object} [params=null] - Query parameters.
   * @returns {Promise<Object>} - API response.
   */
  static async get(url, params = null) {
    const token = LocalStorage.getItem("token");
    const response = await HTTP.get(url, token, params);
    return this.handleResponse(response);
  }

  /**
   * POST request
   * @param {String} url - Request URL.
   * @param {Object} body - Request payload.
   * @returns {Promise<Object>} - API response.
   */
  static async post(url, body) {
    const token = LocalStorage.getItem("token");
    const response = await HTTP.post(url, token, body);
    return this.handleResponse(response);
  }

  /**
   * Handles HTTP responses.
   * @param {Object} response - HTTP response.
   * @returns {Object} - { data, status, error }.
   */
  static handleResponse(response) {
    if (response?.error) {
      return {
        data: null,
        success: response.success || false,
        error: response.error,
      };
    }

    return { data: response.data, success: response.success, error: null };
  }
}

export default HTTPHandler;
