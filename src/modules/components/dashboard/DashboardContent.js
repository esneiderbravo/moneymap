import React, { useEffect, useState } from "react";
import { Grid2, Typography, IconButton } from "@mui/material";
import { formatCurrency } from "../../utils/currency";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import { BalanceSection } from "../../styles/dashboard/DashboardContent.styled";
import AccountsContent from "../../containers/dashboard/AccountsContent";

/**
 * DashboardContent Component
 *
 * Displays the total account balance with an option to toggle visibility,
 * along with individual account balances.
 *
 * @returns {React.JSX.Element} - The DashboardContent component.
 */
const DashboardContent = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [balance, setBalance] = useState({
    accounts: [],
    totalBalance: 0,
  });

  useEffect(() => {
    // Simulating fetching account balances from an API
    setBalance({
      accounts: [
        {
          balance: 10000000,
          name: "Account 1",
          icon: "AccountBalance",
          color: "white",
        },
        {
          balance: 10000000,
          name: "Account 2",
          icon: "AttachMoney",
          color: "green",
        },
        { balance: 5000000, name: "Savings", icon: "Savings", color: "pink" },
      ],
      totalBalance: 20000000,
    });
  }, []);

  /**
   * Toggles the visibility of account balances.
   */
  const toggleBalances = () => setShowBalances((prev) => !prev);

  return (
    <Grid2 container justifyContent="center">
      {/* Section for displaying total balance */}
      <BalanceSection item size={12}>
        <Grid2 item size={12} display="flex" justifyContent="center">
          <Typography variant="subtitle2" color="text.secondary">
            Accounts balance
          </Typography>
        </Grid2>

        <Grid2 item size={12} display="flex" justifyContent="center">
          <Typography variant="h4" color="text.highlight">
            {showBalances ? (
              formatCurrency(balance.totalBalance)
            ) : (
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
            {showBalances ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Grid2>
      </BalanceSection>

      {/* Accounts list */}
      <AccountsContent balance={balance} showBalances={showBalances} />
    </Grid2>
  );
};

export default DashboardContent;
