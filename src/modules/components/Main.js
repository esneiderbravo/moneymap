import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashContainer from "../containers/splash/SplashContainer";
import WithAuth from "./hooks/withAuth";
import DashboardContainer from "../containers/dashboard/DashboardContainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashContainer />} />
      <Route
        path="/dashboard"
        element={
          <WithAuth>
            <DashboardContainer />
          </WithAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
