/**
 * Utility class for managing values in the browser's localStorage.
 */
class LocalStorage {
  /**
   * Stores a value in localStorage under the specified key.
   *
   * @param {string} key - The name of the key to store the value under.
   * @param {string} value - The value to be stored.
   */
  static setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving key "${key}" with value "${value}":`, error);
    }
  }

  /**
   * Retrieves a stored value from localStorage by key.
   *
   * @param {string} key - The name of the key to retrieve.
   * @returns {string | null} - The stored value, or null if not found.
   */
  static getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error retrieving key "${key}":`, error);
      return null;
    }
  }

  /**
   * Removes a stored value from localStorage by key.
   *
   * @param {string} key - The name of the key to remove.
   */
  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}":`, error);
    }
  }

  /**
   * Clears all stored values from localStorage.
   */
  static clear() {
    try {
      localStorage.clear();
      console.log("✅ All localStorage data has been cleared.");
    } catch (error) {
      console.error("❌ Error clearing localStorage:", error);
    }
  }
}

export default LocalStorage;
