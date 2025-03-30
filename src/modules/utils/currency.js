/**
 * Formats a given number as currency.
 *
 * @param {number} value - The numeric value to format.
 * @returns {string} - The formatted currency string (e.g., "$1,000.00").
 *
 * @example
 * formatCurrency(1000); // "$1,000.00"
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};
