import React, { useState } from "react";
import { Grid2, Typography, IconButton } from "@mui/material";
import { formatCurrency } from "../../utils/common/currency";
import { BalanceSection } from "../../styles/dashboard/DashboardContent.styled";
import AccountsContent from "./account/AccountsContent";
import PropTypes from "prop-types";
import { getIconComponent } from "../../utils/common/icon";

/**
 * DashboardContent Component
 *
 * Displays the total account balance with an option to toggle visibility,
 * along with individual account balances.
 *
 * @returns {React.JSX.Element} - The DashboardContent component.
 */
const DashboardContent = ({ balance }) => {
  const [showBalances, setShowBalances] = useState(true);

  // Dynamically get the icons
  const RemoveRedEyeIcon = getIconComponent("RemoveRedEye");
  const VisibilityOffIcon = getIconComponent("VisibilityOff");
  const HorizontalRuleRoundedIcon = getIconComponent("HorizontalRuleRounded");

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
            {showBalances
              ? formatCurrency(balance.totalBalance)
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
      </BalanceSection>

      {/* Accounts list */}
      <AccountsContent balance={balance} showBalances={showBalances} />
    </Grid2>
  );
};

DashboardContent.propTypes = {
  balance: PropTypes.object.isRequired,
};

export default DashboardContent;
