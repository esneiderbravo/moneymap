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

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e3944",
    },
    secondary: {
      main: "#124e66",
    },
    accent: {
      main: "#748d92",
    },
    highlight: {
      main: "#d3d9d4",
    },
    background: {
      main: "#124e66",
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
  },
});

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
