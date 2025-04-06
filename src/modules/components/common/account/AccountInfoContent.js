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
import CommonHeaderContent from "../CommonHeaderContent";
import {
  AccountInfoContainer,
  AdjustBalanceButton,
  EditAccountContainer,
  ListItemButtonAccountInfo,
} from "../../../styles/common/account/AccountInfoContent.styled";
import { formatCurrency } from "../../../utils/common/currency";
import { getIconComponent } from "../../../utils/common/icon";
import getIconColor from "../../../utils/common/color";
import { capitalize } from "../../../utils/string";
import RegisterAccountContent from "./RegisterAccountContent";

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
const AccountInfoContent = ({
  isOpen,
  handleClose,
  currentAccount,
  setCurrentAccount,
}) => {
  const [editAccount, setEditAccount] = useState(false);

  const accountIconsMapper = {
    checking: "AssuredWorkloadSharp",
    savings: "Savings",
  };

  // Get icon component based on account type
  const IconComponent = currentAccount?.type
    ? getIconComponent(accountIconsMapper[currentAccount?.type])
    : null;

  // Icons used in list items
  const BorderColorIcon = getIconComponent("BorderColor");
  const AccountBalanceWalletIcon = getIconComponent("AccountBalanceWallet");
  const TrendingDownIcon = getIconComponent("TrendingDown");
  const TrendingUpIcon = getIconComponent("TrendingUp");
  const SyncIcon = getIconComponent("Sync");

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
        <CommonHeaderContent
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
              <Typography variant="caption">Current balance</Typography>
            </Grid2>
            <Grid2 item size={12} display="flex" justifyContent="center" mb={5}>
              <Typography variant="h5" color="text.white">
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
                  Adjust
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
                          component="span"
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          Account type
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ color: "text.white" }}
                        >
                          {`${capitalize(currentAccount?.type)} account`}
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
                          component="span"
                          variant="caption"
                          sx={{ color: "text.secondary", display: "block" }}
                        >
                          Initial balance
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ color: "text.white" }}
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
                  <ListItemButtonAccountInfo>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      {TrendingDownIcon && (
                        <TrendingDownIcon sx={{ color: "icon.white" }} />
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
                          Expenses quantity
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ color: "text.error" }}
                        >
                          {formatCurrency(0)}
                        </Typography>
                      }
                    />
                  </ListItemButtonAccountInfo>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButtonAccountInfo>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      {TrendingUpIcon && (
                        <TrendingUpIcon sx={{ color: "icon.white" }} />
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
                          Incomes quantity
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ color: "text.success" }}
                        >
                          {formatCurrency(0)}
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
                          component="span"
                          variant="caption"
                          sx={{ color: "text.white", display: "block" }}
                        >
                          Transfer quantity
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ color: "text.white" }}
                        >
                          0 Transfers
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
      <RegisterAccountContent
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
    </>
  );
};

AccountInfoContent.propTypes = {
  /** Whether the drawer is open */
  isOpen: PropTypes.bool.isRequired,
  /** Function to handle drawer closing */
  handleClose: PropTypes.func.isRequired,
  /** The selected account object to display */
  currentAccount: PropTypes.object.isRequired,
  /** Setter to update the selected account */
  setCurrentAccount: PropTypes.func.isRequired,
};

export default AccountInfoContent;
