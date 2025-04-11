import React, { useState } from "react";
import { Grid2, Typography, IconButton } from "@mui/material";
import { formatCurrency } from "../../utils/common/currency";
import {
  BalanceSection,
  ExpenseIconSection,
  ExpenseSection,
  IncomeIconSection,
  IncomeSection,
} from "../../styles/dashboard/Dashboard.styled";
import Accounts from "./accounts/Accounts";
import PropTypes from "prop-types";
import { getIconComponent } from "../../utils/common/icon";
import Alerts from "./alerts/Alerts";
import { useTranslation } from "react-i18next";

/**
 * DashboardContent Component
 *
 * Displays the total account balance with an option to toggle visibility,
 * along with individual account balances.
 *
 * @returns {React.JSX.Element} - The DashboardContent component.
 */
const Dashboard = ({ balance }) => {
  const { t } = useTranslation("dashboard");
  const [showBalances, setShowBalances] = useState(true);

  // Dynamically get the icons
  const RemoveRedEyeIcon = getIconComponent("RemoveRedEye");
  const VisibilityOffIcon = getIconComponent("VisibilityOff");
  const HorizontalRuleRoundedIcon = getIconComponent("HorizontalRuleRounded");
  const ArrowUpwardIcon = getIconComponent("ArrowUpward");
  const ArrowDownwardIcon = getIconComponent("ArrowDownward");

  /**
   * Toggles the visibility of account balances.
   */
  const toggleBalances = () => setShowBalances((prev) => !prev);

  return (
    <Grid2 container>
      {/* Section for displaying total balance */}
      <BalanceSection item size={12}>
        <Grid2 item size={12} display="flex" justifyContent="center">
          <Typography variant="subtitle2" color="text.secondary">
            {t("title")}
          </Typography>
        </Grid2>

        <Grid2 item size={12} display="flex" justifyContent="center">
          <Typography variant="h4" color="text.highlight">
            {showBalances
              ? formatCurrency(balance.totalBalanceAmount)
              : HorizontalRuleRoundedIcon && (
                  <HorizontalRuleRoundedIcon fontSize="large" />
                )}
          </Typography>
        </Grid2>

        {/* Toggle visibility button */}
        <Grid2 item size={12} display="flex" justifyContent="center" mt={2}>
          <IconButton
            onClick={toggleBalances}
            aria-label={showBalances ? "Hide balances" : "Show balances"}
            color="highlight"
          >
            {showBalances
              ? RemoveRedEyeIcon && <RemoveRedEyeIcon />
              : VisibilityOffIcon && <VisibilityOffIcon />}
          </IconButton>
        </Grid2>
        <Grid2 container size={12}>
          <IncomeSection item size={6}>
            <IncomeIconSection item size={2} mr={1}>
              <ArrowUpwardIcon fontSize="large" color="white" />
            </IncomeIconSection>
            <Grid2 item size={4}>
              <Typography color="text.secondary" variant="caption">
                {t("incomes")}
              </Typography>
              <Typography color="text.success" variant="h6">
                {showBalances ? (
                  formatCurrency(0)
                ) : (
                  <HorizontalRuleRoundedIcon fontSize="large" />
                )}
              </Typography>
            </Grid2>
          </IncomeSection>
          <ExpenseSection item size={6}>
            <ExpenseIconSection item size={2} mr={1}>
              <ArrowDownwardIcon fontSize="large" color="white" />
            </ExpenseIconSection>
            <Grid2 item size={4}>
              <Typography color="text.secondary" variant="caption">
                {t("expenses")}
              </Typography>
              <Typography color="text.error" variant="h6">
                {showBalances ? (
                  formatCurrency(0)
                ) : (
                  <HorizontalRuleRoundedIcon fontSize="large" />
                )}
              </Typography>
            </Grid2>
          </ExpenseSection>
        </Grid2>
      </BalanceSection>

      {/* Alerts */}
      <Alerts showBalances={showBalances} />

      {/* Accounts list */}
      <Accounts balance={balance} showBalances={showBalances} />
    </Grid2>
  );
};

Dashboard.propTypes = {
  balance: PropTypes.object.isRequired,
};

export default Dashboard;
