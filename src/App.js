import React from "react";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import Main from "./modules/components/Main";
import { AppProvider } from "./modules/providers/AppProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_AUTH_CLIENT_ID } from "./modules/utils/constants";
import HeaderContent from "./modules/components/common/HeaderContent";
import NavigationContent from "./modules/components/common/NavigationContent";
import { BrowserRouter } from "react-router-dom";

const familyFont = ["Literata", "serif"].join(",");

// Create a custom theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: "#212a31",
    },
    secondary: {
      main: "#2e3844",
      accent: "rgba(255,255,255,0.1)",
    },
    accent: {
      main: "#748d92",
    },
    highlight: {
      main: "#d3d9d4",
    },
    background: {
      main: "#124e66",
      secondary: "#d3d9d4",
    },
    text: {
      primary: "#124e66",
      secondary: "#748d92",
      info: "#55686c",
      error: "#f44336",
      highlight: "#d3d9d4",
      success: "rgba(21,129,15,0.82)",
    },
    icon: {
      white: "#ffffff",
      blue: "#1d60bd",
      pink: "#f093f8",
      green: "#80c47d",
      grey: "#a8aba8",
      red: "#b64242",
      secondary: "#748d92",
    },
  },
  typography: {
    fontFamily: familyFont,
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e3944",
          height: "60px",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#748d92",
          "&.Mui-selected": {
            color: "#d3d9d4",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e3944",
          color: "#748d92",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#212a31",
          color: "#748d92",
          width: "100vw",
          height: "100vh",
          padding: 3,
          display: "flex",
          flexDirection: "column",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#55686c",
        },
      },
    },
  },
});

/**
 * Main application component that initializes the application, theme, and context providers.
 *
 * This component is responsible for setting up the main structure of the application,
 * including routing, theme provider, global styles, and context providers for state management.
 *
 * @returns {JSX.Element} The rendered application component.
 */
const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
        <AppProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles
              styles={{
                body: {
                  width: "100%",
                  margin: 0,
                  overflowX: "hidden",
                  backgroundColor: "#212a31",
                  color: "white",
                  fontFamily: familyFont,
                },
              }}
            />
            <HeaderContent />
            <Main />
            <NavigationContent />
          </ThemeProvider>
        </AppProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
