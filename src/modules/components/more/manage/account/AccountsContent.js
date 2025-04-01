import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { formatCurrency } from "../../../../utils/common/currency";
import { getIconComponent } from "../../../../utils/common/icon";
import { useAppContext } from "../../../../providers/AppProvider";
import CommonHeaderContent from "../../../common/CommonHeaderContent";
import {
  AccountsOptionsContainer,
  ListItemButtonCurrentBalance,
  ListItemButtonTotalUntil,
} from "../../../../styles/more/manage/account/AccountsContent.styled";
import RegisterAccountContent from "./RegisterAccountContent";
import { getLastDayOfMonth } from "../../../../utils/common/date";

/**
 * MoreAccountsContent Component
 *
 * This component displays a right-side drawer containing account options.
 * Users can view individual account balances and a total balance, and they
 * have the ability to close the drawer via a swipe gesture or a button.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.setSelectedOption - Function to update the selected option.
 *
 * @returns {React.JSX.Element} The rendered MoreAccountsContent component.
 */
const AccountsContent = ({ isOpen, setSelectedOption }) => {
  const { state } = useAppContext();
  const { balance } = state;
  const { accounts = [] } = balance;
  const [registerAccount, setRegisterAccount] = useState(false);

  // Dynamically get the icons
  const PaidIcon = getIconComponent("Paid");
  const PriceChangeIcon = getIconComponent("PriceChange");

  /**
   * Handles closing the drawer when triggered by user interaction.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleClose = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    setSelectedOption(null);
  };

  return (
    <>
      {/* Accounts List */}
      {!registerAccount ? (
        <Drawer
          open={isOpen}
          onClose={handleClose}
          anchor="right"
          disableAutoFocus
        >
          {/* Common Header */}
          <CommonHeaderContent handleClose={handleClose} title={"Accounts"} />

          {/* Accounts */}
          <AccountsOptionsContainer
            size={12}
            sx={{ backgroundColor: "secondary.main" }}
            mt={5}
          >
            <Box component="nav">
              {/* Current Balance */}
              <List sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <ListItem disablePadding>
                  <ListItemButtonCurrentBalance>
                    <ListItemIcon sx={{ minWidth: "auto" }}>
                      {PaidIcon && <PaidIcon sx={{ color: "icon.white" }} />}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textAlign: "left" }}
                      primary={
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          Current balance
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{
                            color: "text.success",
                          }}
                        >
                          {formatCurrency(balance.totalBalance)}
                        </Typography>
                      }
                    />
                  </ListItemButtonCurrentBalance>
                </ListItem>

                {/* Divider */}
                <Divider orientation="vertical" flexItem variant="middle" />

                {/* Total Until */}
                <ListItem disablePadding>
                  <ListItemButtonTotalUntil>
                    <ListItemIcon sx={{ minWidth: "auto" }}>
                      {PriceChangeIcon && (
                        <PriceChangeIcon sx={{ color: "icon.white" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textAlign: "left" }}
                      primary={
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          Total until {getLastDayOfMonth()}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{
                            color: "text.success",
                          }}
                        >
                          {formatCurrency(balance.totalBalance)}
                        </Typography>
                      }
                    />
                  </ListItemButtonTotalUntil>
                </ListItem>
              </List>

              {/* Divider */}
              <Divider flexItem variant="middle" />
            </Box>

            <Box component="nav">
              <List>
                {accounts.map((account, index) => {
                  const IconComponent = getIconComponent(account.icon);
                  return (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <ListItemButton
                        sx={{ borderRadius: 2 }}
                        onClick={() => {}}
                      >
                        <ListItemIcon>
                          {IconComponent && (
                            <IconComponent
                              sx={{ color: `icon.${account.color}` }}
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={account.description}
                          secondary={
                            <Typography
                              color="text.success"
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              {formatCurrency(account.balance)}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            {/* Register Account Button */}
            <Grid2 item display="flex" justifyContent="center">
              <Typography
                color="text.highlight"
                onClick={() => {
                  setRegisterAccount(true);
                }}
              >
                Register Account
              </Typography>
            </Grid2>
          </AccountsOptionsContainer>
        </Drawer>
      ) : null}

      {/* Register Account */}
      {registerAccount ? (
        <RegisterAccountContent
          isOpen={registerAccount}
          setRegisterAccount={setRegisterAccount}
        />
      ) : null}
    </>
  );
};

/**
 * Function to update the selected option.
 * Called when the drawer is closed.
 */
AccountsContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default AccountsContent;
