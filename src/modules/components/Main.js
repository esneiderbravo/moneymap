import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashContainer from "../containers/splash/SplashContainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashContainer />} />
    </Routes>
  );
};

export default AppRoutes;
