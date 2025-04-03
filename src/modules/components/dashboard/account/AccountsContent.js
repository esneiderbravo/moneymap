import React from "react";
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
import { AccountSection } from "../../../styles/dashboard/account/AccountsContent.styled";
import { getIconComponent } from "../../../utils/common/icon";

/**
 * AccountsContent Component
 *
 * Displays a list of accounts with their respective balances and an option
 * to add new items. Also shows the total balance.
 *
 * @component
 * @param {Object} props - React props
 * @param {Object} props.balance - Balance data containing accounts and total balance
 * @returns {React.JSX.Element} The rendered AccountsContent component.
 */
const AccountsContent = ({ balance, showBalances }) => {
  const { accounts = [], totalBalance = 0 } = balance;

  // Dynamically get the icons
  const AddIcon = getIconComponent("Add");
  const HorizontalRuleRoundedIcon = getIconComponent("HorizontalRuleRounded");
  const accountIconsMapper = {
    checking: "AssuredWorkloadSharp",
    savings: "Savings",
  };

  /**
   * Handles the click event for the "Add" icon.
   * Prevents event bubbling to the parent button.
   * @param {Event} event - The click event.
   */
  const handleAddClick = (event) => {
    event.stopPropagation();
    alert("Add Icon Clicked!");
  };

  return (
    <>
      {/* Section title */}
      <Grid2 item size={12} display="flex" justifyContent="left" padding={2}>
        <Typography variant="subtitle1" color="text.secondary">
          Accounts
        </Typography>
      </Grid2>

      {/* Account list */}
      <AccountSection
        item
        size={12}
        padding={1}
        sx={{ backgroundColor: "secondary.main" }}
      >
        <Box component="nav">
          <List>
            {accounts.map((account, index) => {
              const IconComponent = getIconComponent(
                accountIconsMapper[account.type]
              );

              return (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton sx={{ borderRadius: 2 }} onClick={() => {}}>
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
                <ListItemText primary="Total" />
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
    </>
  );
};

/**
 * PropTypes for AccountsContent
 */
AccountsContent.propTypes = {
  balance: PropTypes.object.isRequired,
  showBalances: PropTypes.bool.isRequired,
};

export default AccountsContent;
