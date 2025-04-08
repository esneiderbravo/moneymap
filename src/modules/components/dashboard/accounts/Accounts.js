import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatCurrency } from "../../../utils/common/currency";
import { AccountSection } from "../../../styles/dashboard/accounts/Accounts.styled";
import { getIconComponent } from "../../../utils/common/icon";
import AccountInfo from "../../common/account/AccountInfo";
import { ACCOUNTS_ICON_MAPPER } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

/**
 * AccountsContent Component
 *
 * Renders a list of user accounts with descriptions, balances, and icons.
 * Allows interaction such as viewing account details and optionally hiding balances.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.balance - Object containing accounts and total balance
 * @param {boolean} props.showBalances - Whether or not to show balance amounts
 * @returns {React.JSX.Element}
 */
const Accounts = ({ balance, showBalances }) => {
  const { t } = useTranslation("accounts");
  const [currentAccount, setCurrentAccount] = useState(null);

  const { accounts = [], totalBalance = 0 } = balance;

  // Icon components retrieved dynamically
  const AddIcon = getIconComponent("Add");
  const HorizontalRuleRoundedIcon = getIconComponent("HorizontalRuleRounded");

  /**
   * Handle click event for the Add icon inside a ListItem.
   * Prevents event bubbling to the parent ListItemButton.
   *
   * @param {React.MouseEvent} event - The click event object
   */
  const handleAddClick = (event) => {
    event.stopPropagation();
    alert("Add Icon Clicked!");
  };

  /**
   * Closes the current account drawer/modal
   *
   * @param {React.MouseEvent} event - The click event object
   */
  const handleCloseAccount = (event) => {
    event.stopPropagation();
    setCurrentAccount(null);
  };

  return (
    <>
      {/* Section title */}
      <Grid2 item size={12} display="flex" justifyContent="left" padding={2}>
        <Typography variant="subtitle1" color="text.secondary">
          {t("title")}
        </Typography>
      </Grid2>

      {/* Account list section */}
      <AccountSection
        item
        size={12}
        padding={1}
        sx={{ backgroundColor: "secondary.main" }}
      >
        <Box component="nav">
          <List>
            {/* Individual account rows */}
            {accounts.map((account, index) => {
              const IconComponent = getIconComponent(
                ACCOUNTS_ICON_MAPPER[account.type]
              );

              return (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    sx={{ borderRadius: 2 }}
                    onClick={() => setCurrentAccount(account)}
                  >
                    <ListItemIcon>
                      {IconComponent && (
                        <IconComponent sx={{ color: `${account.color}` }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={account.description}
                      secondary={
                        <Typography
                          color="text.success"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          {showBalances ? (
                            `${formatCurrency(account.balance)}`
                          ) : (
                            <span>
                              {HorizontalRuleRoundedIcon && (
                                <HorizontalRuleRoundedIcon />
                              )}
                            </span>
                          )}
                        </Typography>
                      }
                    />

                    {AddIcon && (
                      <AddIcon
                        onClick={handleAddClick}
                        sx={{ color: "icon.white", cursor: "pointer" }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}

            {/* Total balance row */}
            <ListItem key="total" disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                sx={{ borderRadius: 2, justifyContent: "space-between" }}
              >
                <ListItemText primary={t("total")} />
                <ListItemText
                  primary={
                    showBalances ? (
                      `${formatCurrency(totalBalance)}`
                    ) : (
                      <span>
                        <HorizontalRuleRoundedIcon />
                      </span>
                    )
                  }
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </AccountSection>

      {/* Drawer/modal content for selected account */}
      <AccountInfo
        isOpen={!!currentAccount}
        handleClose={handleCloseAccount}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />
    </>
  );
};

/**
 * Prop types for AccountsContent component
 */
Accounts.propTypes = {
  balance: PropTypes.object.isRequired,
  showBalances: PropTypes.bool.isRequired,
};

export default Accounts;
