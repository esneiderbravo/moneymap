import React from "react";
import {
  Backdrop,
  BottomNavigationAction,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { useAppContext } from "../../providers/AppProvider";
import { setCurrentPage } from "../../actions/state";
import { useLocation, useNavigate } from "react-router-dom";
import LocalStorage from "../../utils/localStorage";
import {
  BottomNavigationContent,
  PaperContainer,
  SpeedDialWrapper,
} from "../../styles/common/Navigation.styled";
import { getIconComponent } from "../../utils/common/icon";
import { useTranslation } from "react-i18next";
import NewTransaction from "./transaction/NewTransaction";

/**
 * Navigation component displaying a fixed bottom navigation bar
 * with a SpeedDial menu and navigation options.
 *
 * It shows a floating action button (FAB) with multiple quick actions
 * and switches views between Dashboard and More pages.
 *
 * @returns {React.JSX.Element|null} The navigation bar component or null if on the root path
 */
const Navigation = () => {
  const { t } = useTranslation("navigation");
  const { state, dispatch } = useAppContext();
  const { authData, currentPage } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";
  const [openDial, setOpenDial] = React.useState(false);
  const [openTransaction, setOpenTransaction] = React.useState(false);
  const [currentTransaction, setCurrentTransaction] = React.useState(null);

  // Dynamically load MUI icons
  const HomeIcon = getIconComponent("Home");
  const MoreHorizIcon = getIconComponent("MoreHoriz");
  const TrendingDownIcon = getIconComponent("TrendingDown");
  const TrendingUpIcon = getIconComponent("TrendingUp");
  const LoopIcon = getIconComponent("Loop");
  const AddCardIcon = getIconComponent("AddCard");

  const handleOpenAction = (transactionName) => {
    setOpenDial(false);
    setOpenTransaction(true);
    setCurrentTransaction(transactionName);
  };

  /**
   * SpeedDial action items with associated icons and theme colors.
   */
  const actions = [
    {
      icon: <LoopIcon />,
      name: t("transfer"),
      color: "icon.blue",
      onClick: () => handleOpenAction("transfer"),
    },
    {
      icon: <AddCardIcon />,
      name: t("credit_card"),
      color: "icon.secondary",
      onClick: () => handleOpenAction("credit_card"),
    },
    {
      icon: <TrendingUpIcon />,
      name: t("income"),
      color: "icon.green",
      onClick: () => handleOpenAction("income"),
    },
    {
      icon: <TrendingDownIcon />,
      name: t("expense"),
      color: "icon.red",
      onClick: () => handleOpenAction("expense"),
    },
  ];

  /**
   * Bottom navigation tabs with labels and icons.
   */
  const navigationElements = [
    {
      label: t("dashboard"),
      value: "dashboard",
      icon: HomeIcon && <HomeIcon fontSize="large" />,
    },
    {
      label: t("more"),
      value: "more",
      icon: MoreHorizIcon && <MoreHorizIcon fontSize="large" />,
    },
  ];

  // Do not render the navigation if on the root path
  if (location.pathname === "/") return null;

  /**
   * Handles the change in selected navigation tab.
   *
   * @param {Event} _ - Unused event object
   * @param {string} newValue - The new selected page value
   */
  const handleChange = (_, newValue) => {
    dispatch(setCurrentPage(newValue));
    LocalStorage.setItem("currentPage", newValue);
    navigate(`/${newValue}`);
  };

  return authData ? (
    <>
      <PaperContainer elevation={3}>
        <BottomNavigationContent
          showLabels
          value={currentPage}
          onChange={handleChange}
        >
          {navigationElements.map(({ label, value, icon }) => (
            <BottomNavigationAction
              key={value}
              label={label}
              value={value}
              icon={icon}
            />
          ))}
        </BottomNavigationContent>
        {isDashboardRoute ? (
          <>
            <Backdrop
              open={openDial}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.7)", // darker backdrop
              }}
            />

            <SpeedDialWrapper>
              <SpeedDial
                ariaLabel="Main Speed Dial"
                icon={
                  <SpeedDialIcon
                    sx={{
                      color: "text.primary",
                    }}
                  />
                }
                direction="up"
                onClick={() => setOpenDial(!openDial)}
                open={openDial}
                FabProps={{
                  sx: {
                    backgroundColor: "accent.main",
                    "&:hover": {
                      backgroundColor: "accent.main",
                    },
                    transition: "background-color 0.3s ease",
                  },
                }}
              >
                {actions.map((action) => {
                  return (
                    <SpeedDialAction
                      key={action.name}
                      icon={React.cloneElement(action.icon, {
                        sx: { color: action.color },
                      })}
                      onClick={() => action.onClick()}
                      slotProps={{
                        tooltip: {
                          title: action.name,
                          open: true,
                          direction: "right",
                        },
                      }}
                      sx={{
                        ".MuiSpeedDialAction-staticTooltipLabel": {
                          backgroundColor: "secondary.main",
                          whiteSpace: "nowrap",
                        },
                        ".MuiButtonBase-root": {
                          backgroundColor: "secondary.main",
                        },
                      }}
                    />
                  );
                })}
              </SpeedDial>
            </SpeedDialWrapper>
          </>
        ) : null}
      </PaperContainer>
      <NewTransaction
        isOpen={openTransaction}
        handleClose={(event) => {
          event.stopPropagation();
          document.activeElement?.blur();
          setOpenTransaction(false);
          setCurrentTransaction(null);
        }}
        currentTransaction={currentTransaction}
      />
    </>
  ) : null;
};

/**
 * propTypes declaration for Navigation (currently unused but kept for future use)
 */
Navigation.propTypes = {};

export default Navigation;
