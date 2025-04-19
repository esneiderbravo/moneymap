import React from "react";
import { GlobalStyles, useTheme } from "@mui/material";
import Main from "./modules/components/Main";
import { AppProvider } from "./modules/providers/AppProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_AUTH_CLIENT_ID } from "./modules/utils/constants";
import Header from "./modules/components/common/Header";
import Navigation from "./modules/components/common/Navigation";
import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWrapper } from "./modules/contexts/theme";

const familyFont = ["Literata", "serif"].join(",");

/**
 * Main application component that initializes the application, theme, and context providers.
 *
 * This component is responsible for setting up the main structure of the application,
 * including routing, theme provider, global styles, and context providers for state management.
 *
 * @returns {JSX.Element} The rendered application component.
 */
const AppContent = () => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            width: "100%",
            margin: 0,
            overflowX: "hidden",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            fontFamily: familyFont,
          },
        }}
      />
      <Header />
      <Main />
      <Navigation />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
        <AppProvider>
          <ThemeProviderWrapper>
            <AppContent />
          </ThemeProviderWrapper>
        </AppProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
