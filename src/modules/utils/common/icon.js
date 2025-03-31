// Import all MUI icons in a structured way
import * as Icons from "@mui/icons-material";

/**
 * Returns the corresponding MUI icon component dynamically.
 * @param {string} iconName - The name of the MUI icon (e.g., "AccountBalance").
 * @returns {React.Component|null} - The corresponding MUI icon component or null if not found.
 */
export const getIconComponent = (iconName) => {
  return Icons[iconName] || null;
};
