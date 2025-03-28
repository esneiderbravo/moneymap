import React from "react";
import DashboardContent from "../../components/dashboard/DashboardContent";

/**
 * DashboardContainer Component
 *
 * This container component serves as a wrapper for `DashboardContent`.
 * It manages high-level state and logic before rendering the dashboard UI.
 *
 * @returns {React.JSX.Element} The rendered dashboard content component.
 */
const DashboardContainer = () => {
  return <DashboardContent />;
};

export default DashboardContainer;
