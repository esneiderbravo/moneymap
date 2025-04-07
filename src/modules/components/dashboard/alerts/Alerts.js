import { Grid2, Typography } from "@mui/material";
import React from "react";
import { StyledAlertBox } from "../../../styles/dashboard/alerts/AlertsContent.styled";
import { getIconComponent } from "../../../utils/common/icon";
import { useAppContext } from "../../../providers/AppProvider";
import AlertCard from "./AlertCard";
import PropTypes from "prop-types";

/**
 * AlertsContent component
 *
 * Displays a horizontal list of alert cards, each representing a summary of financial information
 * such as outstanding expenses, upcoming income or expense reminders.
 *
 * Each card includes an icon, a count (e.g., number of reminders), a title, and an optional amount.
 * Clicking a card logs the alert type (can be extended to trigger navigation or modals).
 *
 * This component uses the app context to fetch balance-related alerts.
 *
 * @returns {JSX.Element} A list of interactive alert cards displayed inside a scrollable container.
 */
const Alerts = ({ showBalances }) => {
  const { state } = useAppContext();
  const { balance } = state;
  const { alerts } = balance;
  const { outstandingExpenses, income, expenseReminders, incomeReminders } =
    alerts;

  // Retrieve icon components dynamically using utility helper
  const KeyboardDoubleArrowDownIcon = getIconComponent(
    "KeyboardDoubleArrowDown"
  );
  const KeyboardDoubleArrowUpOutlinedIcon = getIconComponent(
    "KeyboardDoubleArrowUpOutlined"
  );
  const NotificationsNoneOutlinedIcon = getIconComponent(
    "NotificationsNoneOutlined"
  );

  /**
   * Handles click events for each alert card.
   *
   * @param {string} alertType - The label or category of the clicked alert.
   */
  const handleAlertClick = (alertType) => {
    console.log(`Clicked on: ${alertType}`);
    // Placeholder: Replace with navigation or modal logic if needed.
  };

  // Configuration for all alert cards to be rendered
  const alertItems = [
    {
      icon: KeyboardDoubleArrowDownIcon,
      count: outstandingExpenses?.itemCount,
      title: "Outstanding expenses",
      amount: outstandingExpenses?.totalAmount,
      color: "error",
      onClick: () => handleAlertClick("Outstanding expenses"),
    },
    {
      icon: KeyboardDoubleArrowUpOutlinedIcon,
      count: income?.itemCount,
      title: "Incomes",
      amount: income?.totalAmount,
      color: "success",
      onClick: () => handleAlertClick("Incomes"),
    },
    {
      icon: NotificationsNoneOutlinedIcon,
      count: expenseReminders?.itemCount,
      title: "Expenses reminder",
      color: "error",
      onClick: () => handleAlertClick("Expenses reminder"),
    },
    {
      icon: NotificationsNoneOutlinedIcon,
      count: incomeReminders?.itemCount,
      title: "Incomes reminder",
      color: "success",
      onClick: () => handleAlertClick("Incomes reminder"),
    },
  ];

  return (
    <>
      {/* Section title */}
      <Grid2 item xs={12} display="flex" justifyContent="left" padding={2}>
        <Typography variant="subtitle1" color="text.secondary">
          Outstanding and alerts
        </Typography>
      </Grid2>

      {/* Render alert cards in a scrollable container */}
      <StyledAlertBox>
        {alertItems.map((item, idx) => (
          <AlertCard key={idx} {...item} showBalances={showBalances} />
        ))}
      </StyledAlertBox>
    </>
  );
};

Alerts.propTypes = {
  showBalances: PropTypes.bool.isRequired,
};

export default Alerts;
