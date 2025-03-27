import React, { useEffect, useState } from "react";
import { SplashBox, Title, Loader } from "../../styles/splash/Splash.styled";
import GoogleSignInContainer from "../../containers/auth/GoogleSignInContainer";

/**
 * Splash Component
 * @returns {JSX.Element}
 */
const SplashContent = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
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
          <GoogleSignInContainer />
        )}
      </div>
    </SplashBox>
  );
};

export default SplashContent;
