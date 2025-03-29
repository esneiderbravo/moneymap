import axios from "axios";

class HTTP {
  /**
   * Makes an HTTP request with error handling.
   * @param {String} method - HTTP method (get, post, put, delete, etc.).
   * @param {String} url - Request URL.
   * @param {Object} [data=null] - Request body data (optional).
   * @param {String} [token=null] - Authentication token (optional).
   * @param {Object} [params=null] - Query parameters (optional).
   * @returns {Promise<Object>} - API response or structured error.
   */
  static async request({
    method,
    url,
    data = null,
    token = null,
    params = null,
  }) {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios({ method, url, data, params, headers });

      return response.data; // Return only relevant data
    } catch (error) {
      console.error("HTTP Error:", error.response?.data || error.message);
      return { error: error.response?.data || "Network error" };
    }
  }

  /**
   * Authentication request (POST).
   * @param {String} url - Authentication URL.
   * @param {Object} body - Authentication data.
   * @returns {Promise<Object>} - API response.
   */
  static auth(url, body) {
    return this.request({ method: "post", url, data: body });
  }

  /**
   * GET request with an optional token.
   * @param {String} url - Request URL.
   * @param {String} [token=null] - Authentication token.
   * @param {Object} [params=null] - Query parameters.
   * @returns {Promise<Object>} - API response.
   */
  static get(url, token = null, params = null) {
    return this.request({ method: "get", url, token, params });
  }

  /**
   * POST request with an optional token.
   * @param {String} url - Request URL.
   * @param {String} [token=null] - Authentication token.
   * @param {Object} body - Request data.
   * @returns {Promise<Object>} - API response.
   */
  static post(url, token = null, body) {
    return this.request({ method: "post", url, token, data: body });
  }
}

export default HTTP;
