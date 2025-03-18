import React from "react";
import {
  SplashContainer,
  Title,
  Loader,
} from "../../styles/splash/Splash.styled";

/**
 * Splash Component
 * @returns {JSX.Element}
 */
const Splash = () => {
  return (
    <SplashContainer>
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
        <Loader
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </SplashContainer>
  );
};

export default Splash;
