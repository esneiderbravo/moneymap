import { Chip, Grid2, Typography } from "@mui/material";
import React from "react";
import {
  AlertContainer,
  AlertSection,
  StyledAlertBox,
} from "../../../styles/dashboard/alerts/AlertsContent.styled";
import { getIconComponent } from "../../../utils/common/icon";
import { useAppContext } from "../../../providers/AppProvider";
import { formatCurrency } from "../../../utils/common/currency";

/**
 * Renders a list of alerts with icons and descriptions.
 * Each alert is clickable and displays the clicked alert's type in the console.
 */
const AlertsContent = () => {
  const { state } = useAppContext();
  const { balance } = state;
  const { alerts } = balance;
  const { outstandingExpenses, income, expenseReminders, incomeReminders } =
    alerts;
  // Retrieve icon components dynamically
  const KeyboardDoubleArrowDownIcon = getIconComponent(
    "KeyboardDoubleArrowDown"
  );
  const NotificationsNoneOutlinedIcon = getIconComponent(
    "NotificationsNoneOutlined"
  );

  /**
   * Handles click events on alert sections.
   * @param {string} alertType - The type of alert clicked.
   */
  const handleAlertClick = (alertType) => {
    console.log(`Clicked on: ${alertType}`);
    // Add logic for navigation or modal display here
  };

  return (
    <>
      {/* Section title */}
      <Grid2 item size={12} display="flex" justifyContent="left" padding={2}>
        <Typography variant="subtitle1" color="text.secondary">
          Outstanding and alerts
        </Typography>
      </Grid2>

      {/* Alert Section with horizontal scrolling */}
      <StyledAlertBox>
        {/* Outstanding Expenses Alert */}
        <AlertSection
          sx={{ backgroundColor: "secondary.main", p: 2 }}
          onClick={() => handleAlertClick("Outstanding expenses")}
        >
          <AlertContainer item>
            {KeyboardDoubleArrowDownIcon && (
              <KeyboardDoubleArrowDownIcon fontSize="large" />
            )}
            <Chip label={outstandingExpenses?.itemCount} color="error" />
          </AlertContainer>
          <Grid2 item>
            <Typography color="text.secondary" variant="caption">
              Outstanding expenses
            </Typography>
            <Typography color="text.error" variant="h6">
              {formatCurrency(outstandingExpenses?.totalAmount)}
            </Typography>
          </Grid2>
        </AlertSection>

        {/* Incomes Alert */}
        <AlertSection
          sx={{ backgroundColor: "secondary.main", p: 2 }}
          onClick={() => handleAlertClick("Incomes")}
        >
          <AlertContainer item>
            {KeyboardDoubleArrowDownIcon && (
              <KeyboardDoubleArrowDownIcon fontSize="large" />
            )}
            <Chip label={income?.itemCount} color="success" />
          </AlertContainer>
          <Grid2 item>
            <Typography color="text.secondary" variant="caption">
              Incomes
            </Typography>
            <Typography color="text.success" variant="h6">
              {formatCurrency(income?.totalAmount)}
            </Typography>
          </Grid2>
        </AlertSection>

        {/* Expenses Reminder Alert */}
        <AlertSection
          sx={{ backgroundColor: "secondary.main", p: 2 }}
          onClick={() => handleAlertClick("Expenses reminder")}
        >
          <AlertContainer item mb={2}>
            {NotificationsNoneOutlinedIcon && (
              <NotificationsNoneOutlinedIcon fontSize="large" />
            )}
            <Chip label={expenseReminders?.itemCount} color="error" />
          </AlertContainer>
          <Grid2 item>
            <Typography color="text.secondary" variant="caption">
              Expenses reminder
            </Typography>
          </Grid2>
        </AlertSection>

        {/* Incomes Reminder Alert */}
        <AlertSection
          sx={{ backgroundColor: "secondary.main", p: 2 }}
          onClick={() => handleAlertClick("Incomes reminder")}
        >
          <AlertContainer item mb={2}>
            {NotificationsNoneOutlinedIcon && (
              <NotificationsNoneOutlinedIcon fontSize="large" />
            )}
            <Chip label={incomeReminders?.itemCount} color="success" />
          </AlertContainer>
          <Grid2 item>
            <Typography color="text.secondary" variant="caption">
              Incomes reminder
            </Typography>
          </Grid2>
        </AlertSection>
      </StyledAlertBox>
    </>
  );
};

export default AlertsContent;
