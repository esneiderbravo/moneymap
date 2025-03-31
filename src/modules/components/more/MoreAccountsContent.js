import React from "react";
import {
  Box,
  Drawer,
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import useSwipeClose from "../hooks/swipe";
import PropTypes from "prop-types";
import { AccountsOptionsContainer } from "../../styles/more/MoreAccountsContent.styled";
import { formatCurrency } from "../../utils/common/currency";
import { getIconComponent } from "../../utils/common/icon";
import { useAppContext } from "../../providers/AppProvider";

const MoreAccountsContent = ({ setSelectedOption }) => {
  const isOpen = true;
  const { state } = useAppContext();
  const { balance } = state;
  const { accounts = [], totalBalance = 0 } = balance;

  // Dynamically get the icons
  const ArrowBackIosIcon = getIconComponent("ArrowBackIos");

  /**
   * Custom hook to enable swipe-to-close functionality.
   * Automatically closes the drawer when a swipe is detected.
   */
  useSwipeClose({
    isOpen,
    onClose: () => {
      document.activeElement?.blur();
      setSelectedOption(null);
    },
  });

  /**
   * Handles closing the drawer when triggered by user interaction.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleCloseSettings = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    setSelectedOption(null);
  };

  return (
    /**
     * Settings Drawer:
     * - Displays account-related options.
     * - Opens from the right side of the screen.
     */
    <Drawer
      open={isOpen}
      onClose={handleCloseSettings}
      anchor="right"
      disableAutoFocus
    >
      <Grid2 container size={12} sx={{ width: "auto" }} role="presentation">
        {/* Close Button */}
        <Grid2 item padding={3} size={1}>
          {ArrowBackIosIcon && (
            <ArrowBackIosIcon
              onClick={handleCloseSettings}
              sx={{ cursor: "pointer" }}
              aria-label="Close Settings"
              role="button"
              tabIndex={0}
            />
          )}
        </Grid2>
        {/* Title */}
        <Grid2
          item
          padding={3}
          size={10}
          display="flex"
          justifyContent="center"
        >
          <Typography color="text.secondary">Accounts</Typography>
        </Grid2>

        {/* Accounts */}
        <AccountsOptionsContainer
          size={12}
          sx={{ backgroundColor: "primary.main" }}
          mt={5}
        >
          <Box component="nav">
            <List>
              {accounts.map((account, index) => {
                const IconComponent = getIconComponent(account.icon);

                return (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton sx={{ borderRadius: 2 }} onClick={() => {}}>
                      <ListItemIcon>
                        {IconComponent && (
                          <IconComponent
                            sx={{ color: `icon.${account.color}` }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={account.name}
                        secondary={
                          <Typography
                            color="text.success"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            ${formatCurrency(account.balance)}
                          </Typography>
                        }
                      />
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
                    primary={formatCurrency(totalBalance)}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </AccountsOptionsContainer>
      </Grid2>
    </Drawer>
  );
};

MoreAccountsContent.propTypes = {
  /**
   * Function to update the selected option.
   * Called when the drawer is closed.
   */
  setSelectedOption: PropTypes.func.isRequired,
};

export default MoreAccountsContent;
