import React from "react";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import Main from "./modules/components/Main";
import { AppProvider } from "./modules/providers/AppProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_AUTH_CLIENT_ID } from "./modules/utils/constants";
import HeaderContent from "./modules/components/common/HeaderContent";
import FooterContent from "./modules/components/common/FooterContent";
import { AuthProvider } from "./modules/providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const familyFont = ["Monserrat", "serif"].join(",");
const theme = createTheme({
  body: {
    width: "100%",
    margin: 0,
    overflowX: "hidden",
    backgroundColor: "#003135",
    color: "white",
  },
  palette: {
    primary: {
      main: "#003135", // Best for headers, text, or buttons
    },
    secondary: {
      main: "#024950", // Good for backgrounds, cards, or secondary buttons
    },
    accent: {
      main: "#964734", // Can be used for alerts, highlights, or emphasis
    },
    highlight: {
      main: "#0FA4AF", // Good for icons, links, or interactive elements
    },
    background: {
      main: "#AFDDE5", // Ideal for light backgrounds or containers
    },
  },

  typography: {
    fontFamily: familyFont,
  },
});
const App = () => {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
            <AppProvider>
              <AuthProvider>
                <ThemeProvider theme={theme}>
                  <GlobalStyles styles={{ body: theme.body }} />
                  <HeaderContent />
                  <Main />
                  <FooterContent />
                </ThemeProvider>
              </AuthProvider>
            </AppProvider>
          </GoogleOAuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
};

export default App;
