/**
 * Module imports
 */
import { createTheme } from "@mui/material";

/**
 * Creates a custom dark theme using Material-UI's `createTheme` function.
 *
 * This theme provides a dark appearance with custom configurations for:
 * - Palette: Color configuration for primary/secondary, background, text, and icons.
 * - Typography: Sets the primary font family.
 * - Shape: Modifies global UI shapes, such as applying or removing border radius.
 * - Shadows: Defines lighting and shadow effects for various UI elements.
 * - Components: Includes overrides for specific MUI components like BottomNavigation, Drawer, Paper, and Button.
 */
const darkTheme = createTheme({
  palette: {
    /**
     * Primary color scheme for the theme.
     * Used for the most visible elements.
     * @property {string} main - The main primary color (dark background).
     */
    primary: {
      main: "#121417",
    },
    /**
     * Secondary colors for complementary UI elements.
     * Often used for secondary containers.
     * @property {string} main - The main secondary color.
     */
    secondary: {
      main: "#1E222A",
    },
    /**
     * Accent color for specific UI highlights.
     * Often used for buttons and other prominent highlights.
     */
    accent: {
      main: "#6C63FF",
    },
    /**
     * Text-related colors for various levels of emphasis.
     * - `primary`: High-emphasis text.
     * - `secondary`: Medium-emphasis text.
     * - `info`: Informative or less prominent text.
     * - `error`: Colors for error messages and alerts.
     * - `success`: Colors indicating successful actions or events.
     * - `accent`: Highlighted text.
     */
    text: {
      primary: "#FFFFFF", // White for strong contrast
      secondary: "#C4C4CC", // Light gray for secondary text
      info: "#8A94A7", // Subtle brighter info color
      error: "#FF6B6B", // Standard error red
      success: "#4CC38A", // Success green
      accent: "#6C63FF", // Accent color for highlighted text
    },
    /**
     * Background colors for the theme.
     * - `default`: Global app background color.
     * - `paper`: Background color for paper-like surfaces (e.g., cards and modals).
     */
    background: {
      default: "#0F1115", // Deep dark background
      paper: "#1A1F27", // Slightly lighter, card-like background
    },
    /**
     * Icon colors grouped based on usage.
     * Includes common icon colors, secondary icons, and accent usage.
     */
    icon: {
      white: "#E5E5E5",
      blue: "#4A90E2",
      pink: "#D885F9",
      green: "#4CC38A",
      grey: "#9CA3AF",
      red: "#FF6B6B",
      secondary: "#7C8B9D",
      info: "rgba(229, 229, 229, 0.08)", // Transparent info color for icons
      accent: "#6C63FF",
    },
  },
  typography: {
    /**
     * Typography settings for global fonts.
     * @property {string[]} fontFamily - Primary font-family settings.
     */
    fontFamily: ["Literata", "Georgia", "serif"].join(","),
  },
  shape: {
    /**
     * Shape of the UI components.
     * @property {number} borderRadius - Global border radius (0 for sharp edges).
     */
    borderRadius: 0, // No rounded corners
  },
  shadows: [
    // Shadows configuration adds atmospheric depth to components.
    "none", // No shadow
    "0px 1px 3px rgba(0,0,0,0.12)", // Level 1 shadow
    "0px 4px 20px rgba(108,99,255,0.2)", // Custom shadow: subtle violet glow
    ...Array(23).fill("none"), // Other levels default to "none"
  ],
  components: {
    /**
     * BottomNavigation: A component for bottom navigation with style overrides.
     */
    MuiBottomNavigation: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: "60px",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Light shadow
          backgroundColor: theme.palette.secondary.main,
          backdropFilter: "blur(6px)", // Frosted glass effect
        }),
      },
    },
    /**
     * BottomNavigationAction: Customized color behavior for navigation items.
     * Includes styles for default and selected states.
     */
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.icon.white, // Default icon color
          "&.Mui-selected": {
            color: theme.palette.accent.main, // Accent color for selected items
          },
        }),
      },
    },
    /**
     * Paper: Component for paper-like surfaces, such as modals and cards.
     */
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main, // Dark background by default
          color: theme.palette.text.primary, // Bright text for contrast
          borderRadius: theme.shape.borderRadius, // Global border radius
        }),
      },
    },
    /**
     * Drawer: Component for sliding navigation drawers.
     * Includes styles for width, height, and layout configurations.
     */
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.secondary,
          width: "100vw", // Full width
          height: "100vh", // Full height
          padding: 3, // Global padding for drawer content
          display: "flex",
          flexDirection: "column", // Column layout
        }),
      },
    },
    /**
     * Divider: Horizontal or vertical separator lines.
     */
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.text.info, // Info color for visibility
        }),
      },
    },
    /**
     * Button: Styled button component with custom background and text color.
     * Includes hover effect and shape configuration.
     */
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.accent.main, // Accent color
          color: theme.palette.text.primary, // Bright text for contrast
          borderRadius: theme.shape.borderRadius, // Global corner radius
          textTransform: "none", // Removes uppercase transformation
        }),
      },
    },
  },
});

/**
 * Exports the dark theme configuration to be used in the application.
 */
export default darkTheme;
