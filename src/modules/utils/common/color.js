/**
 * Determines the best checkmark color for contrast.
 * @param {string} color - The selected color in hex format.
 * @returns {string} - "black" or "white" for optimal contrast.
 */
const getIconColor = (color) => {
  if (color) {
    // Remove the hash and split the hex color into RGB components
    const [r, g, b] = color
      .replace(/^#/, "")
      .match(/.{2}/g)
      .map((hex) => parseInt(hex, 16));

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black or white based on the luminance
    return luminance > 0.5 ? "black" : "white";
  }
};

export default getIconColor;
