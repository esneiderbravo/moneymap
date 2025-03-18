import React from "react";
import { BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-circular-progressbar/dist/styles.css";
import { GlobalStyles } from "@mui/material";
import NotificationContainer from "../containers/notifications/Notification";
import Main from "./Main";

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
          <ThemeProvider theme={theme}>
            <GlobalStyles styles={{ body: theme.body }} />
            <NotificationContainer />
            <Main />
          </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
};

export default App;
