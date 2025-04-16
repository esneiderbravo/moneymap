import Ajv from "ajv";
import addErrors from "ajv-errors";
import i18next from "i18next";

/**
 * Utility function to load JSON schema by name.
 * @param {string} schemaName - The name of the schema file (without extension).
 * @returns {Object} The JSON schema.
 */
export const getJsonSchema = (schemaName) => {
  try {
    // Get the current language set in i18next
    const currentLanguage = i18next.language || "en";

    // Construct the path based on the current language
    return require(`../../schema/${currentLanguage}/${schemaName}.json`);
  } catch (error) {
    console.error(
      `Error loading schema: ${schemaName} for language: ${i18next.language}`,
      error
    );
    return null;
  }
};

export const validateFormData = (jsonSchemaName, formData, setErrors) => {
  const ajv = new Ajv({ allErrors: true });
  addErrors(ajv);

  const schema = getJsonSchema(jsonSchemaName);
  const validate = ajv.compile(schema);
  const isValid = validate(formData);

  if (!isValid) {
    const fieldErrors = {};
    for (const err of validate.errors) {
      const field = err.instancePath.replace(/^\//, "");
      fieldErrors[field] = err.message || "Invalid input";
    }
    setErrors(fieldErrors);
    return false;
  }

  setErrors({});
  return true;
};
