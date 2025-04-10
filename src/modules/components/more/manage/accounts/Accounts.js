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
import CommonHeader from "../../../common/CommonHeader";
import {
  AccountsOptionsContainer,
  ListItemButtonCurrentBalance,
  ListItemButtonTotalUntil,
} from "../../../../styles/more/manage/accounts/Accounts.styled";
import RegisterAccount from "../../../common/account/RegisterAccount";
import { getLastDayOfMonth } from "../../../../utils/common/date";
import { ACCOUNTS_ICON_MAPPER } from "../../../../utils/constants";
import AccountInfo from "../../../common/account/AccountInfo";
import { useTranslation } from "react-i18next";
import useSwipeClose from "../../../hooks/useSwipeClose";

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
const Accounts = ({ isOpen, setSelectedOption }) => {
  const { t } = useTranslation("manage_accounts");
  const { state } = useAppContext();
  const { balance } = state;
  const { accounts = [] } = balance;
  const [registerAccount, setRegisterAccount] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

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

  /**
   * Closes the current account drawer/modal
   *
   * @param {React.MouseEvent} event - The click event object
   */
  const handleCloseAccount = (event) => {
    event.stopPropagation();
    setCurrentAccount(null);
  };

  useSwipeClose({
    isOpen: isOpen,
    onClose: (event) => handleClose(event),
  });

  return (
    <>
      {/* Accounts List */}

      <Drawer
        key="ListAccounts"
        open={isOpen}
        onClose={handleClose}
        anchor="right"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        {/* Common Header */}
        <CommonHeader handleClose={handleClose} title={t("title")} />

        {/* Accounts */}
        <AccountsOptionsContainer
          size={12}
          sx={{ backgroundColor: "secondary.main", height: "100vh" }}
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
                        {t("current_balance")}
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
                        {formatCurrency(balance.totalBalanceAmount)}
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
                        {t("total")} {getLastDayOfMonth()}
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
                        {formatCurrency(balance.totalBalanceAmount)}
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
              {t("register_account")}
            </Typography>
          </Grid2>
        </AccountsOptionsContainer>
      </Drawer>

      {/* Register Account */}

      {/* Account Details */}
      <AccountInfo
        isOpen={!!currentAccount}
        handleClose={handleCloseAccount}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      <RegisterAccount
        key="CreateAccount"
        isOpen={registerAccount}
        handleClose={(event) => {
          event.stopPropagation();
          document.activeElement?.blur();
          setRegisterAccount(false);
        }}
      />
    </>
  );
};

/**
 * Function to update the selected option.
 * Called when the drawer is closed.
 */
Accounts.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default Accounts;
