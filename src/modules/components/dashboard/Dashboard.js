import React from "react";
import DashboardContent from "../../components/dashboard/DashboardContent";
import PropTypes from "prop-types";

/**
 * Dashboard Component
 *
 * This component serves as a wrapper for `DashboardContent`.
 * It manages high-level state and logic before rendering the dashboard UI.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.balance - The user's financial balance data.
 * @returns {React.JSX.Element} The rendered dashboard content component.
 */
const Dashboard = ({ balance }) => {
  return <DashboardContent balance={balance} />;
};

Dashboard.propTypes = {
  balance: PropTypes.object.isRequired,
};

export default Dashboard;
