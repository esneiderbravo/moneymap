/**
 * Utility function to load JSON schema by name.
 * @param {string} schemaName - The name of the schema file (without extension).
 * @returns {Object} The JSON schema.
 */
export const getJsonSchema = (schemaName) => {
  try {
    return require(`../../schema/${schemaName}.json`);
  } catch (error) {
    console.error(`Error loading schema: ${schemaName}`, error);
    return null;
  }
};
