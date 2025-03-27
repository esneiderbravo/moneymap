import React, { useEffect, useState } from "react";
import { SplashBox, Title, Loader } from "../../styles/splash/Splash.styled";
import GoogleSignInContainer from "../../containers/auth/GoogleSignInContainer";
import { useAppContext } from "../../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

/**
 * Splash Component
 * @returns {JSX.Element}
 */
const SplashContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { state } = useAppContext();
  const { authData } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const loadLoginSection = () => {
    if (authData) {
      return (
        <Button
          onClick={() => {
            navigate("/dashboard");
          }}
          variant="contained"
        >
          Go to Dashboard
        </Button>
      );
    }
    return <GoogleSignInContainer />;
  };

  return (
    <SplashBox>
      <div>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 3,
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
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
          />
        ) : (
          loadLoginSection()
        )}
      </div>
    </SplashBox>
  );
};

export default SplashContent;
