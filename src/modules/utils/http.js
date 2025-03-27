import axios from "axios";

/**
 * HTTP helper
 */
class HTTP {
  /**
   * Authentication request
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} body Data to be created. Ie, {'client_id': '123'}
   */
  static async auth(url, body) {
    try {
      return await axios({
        method: "post",
        url,
        data: body,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * GET request
   * @param {String} token Session token. Ie, 'asdf.2341.qwert'
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} params Parameters to send in request. Ie, {token: ''}
   */
  static async get(token, url, params) {
    try {
      let request = {
        method: "get",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (params) {
        request["params"] = params;
      }

      return await axios(request);
    } catch (error) {
      return error;
    }
  }

  /**
   * POST request
   * @param {String} token Session token. Ie, 'asdf.2341.qwert'
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} body Data to be created. Ie, {'client_id': '123'}
   */
  static async post(token, url, body) {
    try {
      return await axios({
        method: "post",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * POST with files request
   * @param {String} token Session token. Ie, 'asdf.2341.qwert'
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} formData Data to be created. Ie, {'client_id': '123'}
   */
  static async postFiles(token, url, formData) {
    try {
      return await axios({
        method: "post",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * PUT request
   * @param {String} token Session token. Ie, 'asdf.2341.qwert'
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} body Data to be updated. Ie, {'client_id': '123'}
   */
  static async put(token, url, body) {
    try {
      return await axios({
        method: "put",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * DELETE request
   * @param {String} token Session token. Ie, 'asdf.2341.qwert'
   * @param {String} url Url to make the request. Ie, 'http://...'
   */
  static async delete(token, url) {
    try {
      return await axios({
        method: "delete",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return error;
    }
  }
}

export default HTTP;
