import LocalStorage from "./localStorage";
import HTTP from "./http";

/**
 * HTTPHandler class
 */
class HTTPHandler {
  /**
   * Authentication request
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} body Data to be created. Ie, {'client_id': '123'}
   */
  static async auth(url, body) {
    const response = await HTTP.auth(url, body);
    const { status } = response;

    if (status < 400) {
      const { data } = response;
      return [data, status];
    }

    const { data } = response.response;
    return [data, status];
  }

  /**
   * GET request
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} params Parameters to send in request. Ie, {token: ''}
   */
  static async get(url, params) {
    const token = LocalStorage.getItem("token");
    const response = await HTTP.get(token, url, params);

    return this.handleResponse(response);
  }

  /**
   * POST request
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} body Data to be created. Ie, {'client_id': '123'}
   */
  static async post(url, body) {
    const token = LocalStorage.getItem("token");
    const response = await HTTP.post(token, url, body);

    return this.handleResponse(response);
  }

  /**
   * PUT request
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} body Data to be updated. Ie, {'client_id': '123'}
   */
  static async put(url, body) {
    const token = localStorage.getItem("token");
    const response = await HTTP.put(token, url, body);

    return this.handleResponse(response);
  }

  /**
   * DELETE request
   * @param {String} url Url to make the request. Ie, 'http://...'
   */
  static async delete(url) {
    const token = localStorage.getItem("token");
    const response = await HTTP.delete(token, url);

    return this.handleResponse(response);
  }

  /**
   * POST files request
   * @param {String} url Url to make the request. Ie, 'http://...'
   *@param {Object} formData Data to be created. Ie, {'client_id': '123'}
   */
  static async postFiles(url, formData) {
    const token = localStorage.getItem("token");
    const response = await HTTP.postFiles(token, url, formData);

    return this.handleResponse(response);
  }

  /**
   * Handle HTTP response
   * @param {Object} response HTTP response. Ie, {data: {}, ...}
   */
  static handleResponse(response) {
    const { status } = response;

    if (status < 400) {
      const { data } = response.data;
      return [data, status];
    }

    const { data } = response.response;
    return [data, status];
  }
}

export default HTTPHandler;
