/**
 * Module imports
 */
import { createTheme } from "@mui/material/styles";

/**
 * Creates a custom light theme using Material-UI's `createTheme` function.
 *
 * The theme includes custom configurations for:
 * - Palette: Defines the application colors, including primary, secondary, text colors, icons,
 *   and background shades.
 * - Typography: Specifies fonts and font sizes.
 * - Shape: Defines the border radius for elements.
 * - Shadows: Custom shadow configurations for elements.
 * - Components: Includes component-specific style overrides for MUI components like BottomNavigation,
 *   Paper, Drawer, Divider, and Button.
 */
const lightTheme = createTheme({
  palette: {
    /**
     * Palette for the primary color scheme.
     * @property {string} main - The main primary color.
     */
    primary: {
      main: "#f4f4f4", // Soft light gray background
    },
    /**
     * Palette for secondary color scheme.
     * @property {string} main - The main secondary color.
     */
    secondary: {
      main: "#e0e0e0", // Subtle secondary elements
    },
    /**
     * Accent color used in various UI highlights.
     * @property {string} main - The main accent color.
     */
    accent: {
      main: "#9E8DFF", // Gentle accent color
    },
    /**
     * Text colors for different levels of emphasis.
     * - `primary`: High-emphasis text.
     * - `secondary`: Medium-emphasis text.
     * - `info`: Informative text.
     * - `error`: Error messages, usually in red.
     * - `success`: Success messages, usually in green.
     * - `accent`: Highlighted text using the accent color.
     */
    text: {
      primary: "#4a4a4a", // Dark gray for better readability
      secondary: "#6b6b6b", // Softer gray for secondary text
      info: "#9E9E9E", // Neutral informational text
      error: "#E57373", // Muted red for errors
      success: "#81C784", // Muted green for success
      accent: "#9E8DFF", // Accent color for text
    },
    /**
     * Background colors.
     * - `default`: The default background color.
     * - `paper`: Color for components with paper-like surfaces.
     */
    background: {
      default: "#f4f4f4", // Soft off-white
      paper: "#ffffff", // Paper white
    },
    /**
     * Icon colors for different purposes.
     */
    icon: {
      white: "#4a4a4a",
      blue: "#5A9BD5",
      pink: "#F1A7D4",
      green: "#A0D4A0",
      grey: "#BDBDBD",
      red: "#EF5350",
      secondary: "#9E9E9E",
      info: "rgba(0, 0, 0, 0.05)",
      accent: "#9E8DFF",
    },
  },
  typography: {
    /**
     * Typography configurations.
     * @property {string[]} fontFamily - An array of font-family names.
     * @property {number} fontSize - The base font size.
     */
    fontFamily: ["Literata", "Georgia", "serif"].join(","),
    fontSize: 14,
  },
  shape: {
    /**
     * Defines border radius for rounded corners.
     * @property {number} borderRadius - The border-radius for all rounded elements.
     */
    borderRadius: 8,
  },
  shadows: [
    // Custom shadow definitions, where first three entries are explicitly set,
    // and the remaining are defaulted to "none".
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.05)",
    "0px 3px 6px rgba(0, 0, 0, 0.08)",
    ...Array(23).fill("none"),
  ],
  components: {
    /**
     * Style overrides for the Material-UI BottomNavigation component.
     */
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: "60px",
          boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.05)",
          backgroundColor: theme.palette.secondary.main,
          backdropFilter: "blur(4px)",
        }),
      },
    },
    /**
     * Style overrides for the Material-UI BottomNavigationAction component.
     */
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.icon.grey,
          "&.Mui-selected": {
            color: theme.palette.accent.main,
          },
        }),
      },
    },
    /**
     * Style overrides for the Material-UI Paper component.
     */
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: theme.shape.borderRadius,
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
        }),
      },
    },
    /**
     * Style overrides for the Material-UI Drawer component.
     */
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.secondary,
          width: "100vw",
          height: "100vh",
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }),
      },
    },
    /**
     * Style overrides for the Material-UI Divider component.
     */
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.text.info,
        }),
      },
    },
    /**
     * Style overrides for the Material-UI Button component.
     */
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.accent.main,
          color: "#ffffff",
          borderRadius: theme.shape.borderRadius,
          textTransform: "none",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            backgroundColor: "#8C7FFF", // Slightly darker hover effect for the button.
          },
        }),
      },
    },
  },
});

/**
 * Exports the light theme configuration to be used in the application.
 */
export default lightTheme;
