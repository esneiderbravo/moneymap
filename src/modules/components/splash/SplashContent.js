import React, { useEffect, useState, useMemo } from "react";
import {
  SplashBox,
  Title,
  Loader,
  MotionDiv,
  LogoContainer,
} from "../../styles/splash/Splash.styled";
import GoogleSignInContainer from "../../containers/auth/GoogleSignInContainer";
import { useAppContext } from "../../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../../../resources/logo.webp";

/**
 * SplashContent Component
 *
 * Displays a splash screen with a loading animation before transitioning
 * to either a login section or a dashboard button based on authentication status.
 *
 * @returns {JSX.Element} The rendered splash screen or login section.
 */
const SplashContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { state, language } = useAppContext();
  const { authData } = state;
  const { splash } = language || {};
  const buttonText = splash?.buttonText;
  const navigate = useNavigate();

  /**
   * Handles splash screen timeout.
   *
   * After 5 seconds, hides the splash screen and shows the login section.
   */
  useEffect(() => {
    if (!authData) {
      const timerId = setTimeout(() => setShowSplash(false), 5000);
      return () => clearTimeout(timerId); // Cleanup function to avoid memory leaks
    } else setShowSplash(false);
  }, [authData]);

  /**
   * Determines the UI after the splash screen.
   *
   * - If the user is authenticated, displays a button to navigate to the dashboard.
   * - If not authenticated, shows the Google Sign-In component.
   */
  const loginSection = useMemo(() => {
    return authData ? (
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
      >
        <Button
          onClick={() => {
            navigate("/dashboard");
          }}
          variant="contained"
          color="secondary"
        >
          {buttonText}
        </Button>
      </MotionDiv>
    ) : (
      <GoogleSignInContainer />
    );
  }, [authData, buttonText, navigate]);

  return (
    <SplashBox>
      <LogoContainer src={`${logo}`} loading="lazy" />
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
      >
        {language?.title || "Money Map"}
      </Title>
      {showSplash ? (
        <Loader
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
        />
      ) : (
        loginSection
      )}
    </SplashBox>
  );
};

export default SplashContent;
