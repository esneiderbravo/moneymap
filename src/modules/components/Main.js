import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashContainer from "../containers/splash/SplashContainer";
import WithAuth from "./hooks/withAuth";
import DashboardContainer from "../containers/dashboard/DashboardContainer";
import LogoutContainer from "../containers/auth/LogoutContainer";
import MoreContainer from "../containers/more/MoreContainer";
import useBlockBack from "./hooks/useBlockBack";

/**
 * AppRoutes Component
 *
 * Defines the application's main routing structure using React Router.
 * It includes public and protected routes, ensuring authentication
 * for specific sections using the `WithAuth` component.
 *
 * @returns {JSX.Element} The configured routes of the application.
 */
const AppRoutes = () => {
  useBlockBack();
  return (
    <main
      style={{
        marginBottom: "100px",
      }}
    >
      <Routes>
        {/* Public Route: Splash Screen */}
        <Route path="/" element={<SplashContainer />} />

        {/* Protected Route: Dashboard - Requires Authentication */}
        <Route
          path="/dashboard"
          element={
            <WithAuth>
              <DashboardContainer />
            </WithAuth>
          }
        />

        {/* Protected Route: Logout - Requires Authentication */}
        <Route
          path="/logout"
          element={
            <WithAuth>
              <LogoutContainer />
            </WithAuth>
          }
        />

        {/* Protected Route: Logout - Requires Authentication */}
        <Route
          path="/more"
          element={
            <WithAuth>
              <MoreContainer />
            </WithAuth>
          }
        />
      </Routes>
    </main>
  );
};

export default AppRoutes;
