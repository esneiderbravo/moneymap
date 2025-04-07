import React, { useEffect, useState } from "react";
import {
  SplashBox,
  Title,
  Loader,
  LogoContainer,
} from "../../styles/splash/Splash.styled";
import GoogleSignInContainer from "../../containers/auth/GoogleSignInContainer";
import { useAppContext } from "../../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import logo from "../../../resources/logo.webp";
import { setCurrentPage } from "../../actions/state";
import {
  FADE_IN_DURATION,
  LOADER_FADE_IN,
  SPLASH_TIMEOUT,
} from "../../utils/constants";

/**
 * SplashContent Component
 *
 * Displays a splash screen with a loading animation before transitioning
 * to either a login section or a dashboard based on authentication status.
 *
 * @returns {JSX.Element} The rendered splash screen or login section.
 */
const Splash = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { state, dispatch } = useAppContext();
  const { authData } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSplash(false);

      // Dispatch state updates only if necessary
      dispatch(setCurrentPage("dashboard"));

      if (authData) {
        navigate("/dashboard");
      }
    }, SPLASH_TIMEOUT);

    return () => clearTimeout(timerId); // Cleanup function to avoid memory leaks
  }, [authData, dispatch, navigate]);

  return (
    <SplashBox>
      <LogoContainer src={logo} loading="lazy" alt="Money Map Logo" />
      <Title
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: FADE_IN_DURATION,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        Money Map
      </Title>
      {showSplash ? (
        <Loader
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: LOADER_FADE_IN, ease: "easeInOut", delay: 1 }}
        />
      ) : !authData ? (
        <GoogleSignInContainer />
      ) : null}
    </SplashBox>
  );
};

export default Splash;
