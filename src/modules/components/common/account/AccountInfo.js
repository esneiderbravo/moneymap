import React, { useState } from "react";
import {
  Divider,
  Drawer,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import CommonHeader from "../CommonHeader";
import {
  AccountInfoContainer,
  AdjustBalanceButton,
  EditAccountContainer,
  ListItemButtonAccountInfo,
} from "../../../styles/common/account/AccountInfo.styled";
import { formatCurrency } from "../../../utils/common/currency";
import { getIconComponent } from "../../../utils/common/icon";
import getIconColor from "../../../utils/common/color";
import RegisterAccount from "./RegisterAccount";
import { useTranslation } from "react-i18next";
import useSwipeClose from "../../hooks/useSwipeClose";
import { ACCOUNTS_ICON_MAPPER } from "../../../utils/constants";
import AccountTransaction from "../transaction/AccountTransaction";

/**
 * AccountInfoContent component renders detailed information about a selected account,
 * including current balance, account type, initial balance, transaction summaries,
 * and allows editing the account through a side drawer.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the drawer is open
 * @param {Function} props.handleClose - Function to close the drawer
 * @param {Object} props.currentAccount - The currently selected account object
 * @param {Function} props.setCurrentAccount - Setter function to update the account state
 */
const AccountInfo = ({
  isOpen,
  handleClose,
  currentAccount,
  setCurrentAccount,
}) => {
  const { t } = useTranslation("account_info");
  const [editAccount, setEditAccount] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState(null);

  // Get icon component based on account type
  const IconComponent = currentAccount?.type
    ? getIconComponent(ACCOUNTS_ICON_MAPPER[currentAccount?.type])
    : null;

  // Icons used in list items
  const BorderColorIcon = getIconComponent("BorderColor");
  const AccountBalanceWalletIcon = getIconComponent("AccountBalanceWallet");
  const TrendingDownIcon = getIconComponent("TrendingDown");
  const TrendingUpIcon = getIconComponent("TrendingUp");
  const SyncIcon = getIconComponent("Sync");

  useSwipeClose({ isOpen: isOpen, onClose: (event) => handleClose(event) });

  const handleTransaction = (transactionType) => {
    setShowTransaction(true);
    setTransactionType(transactionType);
  };

  return (
    <>
      <Drawer
        key="accountInfo"
        open={isOpen}
        onClose={handleClose}
        anchor="right"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        <CommonHeader
          handleClose={handleClose}
          title={currentAccount?.description}
        />

        <AccountInfoContainer
          size={12}
          sx={{ backgroundColor: "secondary.main", height: "100vh" }}
        >
          {/* Header balance section */}
          <Grid2 container mb={5}>
            <Grid2 item size={12} display="flex" justifyContent="center">
              <Typography variant="caption" sx={{ color: "text.info" }}>
                {t("current_balance")}
              </Typography>
            </Grid2>
            <Grid2 item size={12} display="flex" justifyContent="center" mb={5}>
              <Typography variant="h5" sx={{ color: "text.primary" }}>
                {formatCurrency(currentAccount?.balance)}
              </Typography>
            </Grid2>
            <Grid2
              item
              size={12}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={2}
            >
              <Grid2 item size={4} />
              <Grid2 item size={4} display="flex" justifyContent="center">
                <AdjustBalanceButton
                  variant="contained"
                  size="medium"
                  custom_color={currentAccount?.color}
                >
                  {t("adjust")}
                </AdjustBalanceButton>
              </Grid2>
              <Grid2 item size={4} display="flex" justifyContent="flex-end">
                {BorderColorIcon && (
                  <EditAccountContainer
                    custom_color={currentAccount?.color}
                    onClick={() => setEditAccount(true)}
                  >
                    <BorderColorIcon
                      fontSize="medium"
                      sx={{ color: getIconColor(currentAccount?.color) }}
                    />
                  </EditAccountContainer>
                )}
              </Grid2>
            </Grid2>
          </Grid2>

          <Divider variant="middle" />

          {/* Account details list */}
          <Grid2 container>
            <Grid2 item>
              <List sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                {/* Account type */}
                <ListItem disablePadding>
                  <ListItemButtonAccountInfo>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      {IconComponent && (
                        <IconComponent sx={{ color: "icon.white" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textAlign: "left" }}
                      primary={
                        <Typography
                          variant="caption"
                          sx={{ color: "text.info", display: "block" }}
                        >
                          {t("account_type")}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ color: "text.primary" }}
                        >
                          {t(currentAccount?.type)}
                        </Typography>
                      }
                    />
                  </ListItemButtonAccountInfo>
                </ListItem>

                {/* Initial balance */}
                <ListItem disablePadding>
                  <ListItemButtonAccountInfo>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      {AccountBalanceWalletIcon && (
                        <AccountBalanceWalletIcon
                          sx={{ color: "icon.white" }}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textAlign: "left" }}
                      primary={
                        <Typography
                          variant="caption"
                          sx={{ color: "text.info", display: "block" }}
                        >
                          {t("initial_balance")}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ color: "text.primary" }}
                        >
                          {formatCurrency(currentAccount?.balance)}
                        </Typography>
                      }
                    />
                  </ListItemButtonAccountInfo>
                </ListItem>
              </List>
            </Grid2>

            {/* Expenses and Incomes */}
            <Grid2 item>
              <List sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <ListItem disablePadding>
                  <ListItemButtonAccountInfo
                    onClick={() => handleTransaction("expense")}
                  >
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      {TrendingDownIcon && (
                        <TrendingDownIcon sx={{ color: "icon.white" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textAlign: "left" }}
                      primary={
                        <Typography
                          variant="caption"
                          sx={{ color: "text.info", display: "block" }}
                        >
                          {t("expenses_quantity")}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ color: "text.error" }}
                        >
                          {currentAccount?.expenseCount}
                        </Typography>
                      }
                    />
                  </ListItemButtonAccountInfo>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButtonAccountInfo
                    onClick={() => handleTransaction("income")}
                  >
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      {TrendingUpIcon && (
                        <TrendingUpIcon sx={{ color: "icon.white" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textAlign: "left" }}
                      primary={
                        <Typography
                          variant="caption"
                          sx={{ color: "text.info", display: "block" }}
                        >
                          {t("incomes_quantity")}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ color: "text.success" }}
                        >
                          {currentAccount?.incomeCount}
                        </Typography>
                      }
                    />
                  </ListItemButtonAccountInfo>
                </ListItem>
              </List>
            </Grid2>

            {/* Transfers */}
            <Grid2 item>
              <List sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <ListItem disablePadding>
                  <ListItemButtonAccountInfo>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      {SyncIcon && <SyncIcon sx={{ color: "icon.white" }} />}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textAlign: "left" }}
                      primary={
                        <Typography
                          variant="caption"
                          sx={{ color: "text.info", display: "block" }}
                        >
                          {t("transfer_quantity")}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body1"
                          sx={{ color: "text.primary" }}
                        >
                          0 {t("transfers")}
                        </Typography>
                      }
                    />
                  </ListItemButtonAccountInfo>
                </ListItem>
              </List>
            </Grid2>
          </Grid2>
        </AccountInfoContainer>
      </Drawer>

      {/* Edit account form modal */}
      <RegisterAccount
        key="CreateAccount"
        isOpen={editAccount}
        handleClose={(event) => {
          event.stopPropagation();
          document.activeElement?.blur();
          setEditAccount(false);
        }}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      <AccountTransaction
        isOpen={showTransaction}
        handleClose={(event) => {
          event.stopPropagation();
          document.activeElement?.blur();
          setShowTransaction(false);
          setTransactionType(null);
        }}
        currentAccount={currentAccount}
        transactionType={transactionType}
      />
    </>
  );
};

AccountInfo.propTypes = {
  /** Whether the drawer is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to handle drawer closing */
  handleClose: PropTypes.func.isRequired,
  /** The selected account object to display */
  currentAccount: PropTypes.object.isRequired,
  /** Setter to update the selected account */
  setCurrentAccount: PropTypes.func.isRequired,
};

export default AccountInfo;
