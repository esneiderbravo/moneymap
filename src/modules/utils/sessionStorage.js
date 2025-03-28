/**
 * Utility class for managing values in the browser's sessionStorage.
 */
class SessionStorage {
  /**
   * Stores a value in sessionStorage under the specified key.
   *
   * @param {string} key - The name of the key to store the value under.
   * @param {string} value - The value to be stored.
   */
  static setItem(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving key "${key}" with value "${value}":`, error);
    }
  }

  /**
   * Retrieves a stored value from sessionStorage by key.
   *
   * @param {string} key - The name of the key to retrieve.
   * @returns {string | null} - The stored value, or null if not found.
   */
  static getItem(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.error(`Error retrieving key "${key}":`, error);
      return null;
    }
  }

  /**
   * Removes a stored value from sessionStorage by key.
   *
   * @param {string} key - The name of the key to remove.
   */
  static removeItem(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}":`, error);
    }
  }

  /**
   * Clears all data stored in sessionStorage.
   */
  static clear() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  }
}

export default SessionStorage;
