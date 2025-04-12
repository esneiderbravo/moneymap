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
  const [openDial, setOpenDial] = React.useState(false);

  // Dynamically load MUI icons
  const HomeIcon = getIconComponent("Home");
  const MoreHorizIcon = getIconComponent("MoreHoriz");
  const TrendingDownIcon = getIconComponent("TrendingDown");
  const TrendingUpIcon = getIconComponent("TrendingUp");
  const LoopIcon = getIconComponent("Loop");
  const AddCardIcon = getIconComponent("AddCard");

  /**
   * SpeedDial action items with associated icons and theme colors.
   */
  const actions = [
    { icon: <LoopIcon />, name: "Transfer", color: "icon.blue" },
    { icon: <TrendingUpIcon />, name: "Income", color: "icon.green" },
    {
      icon: <AddCardIcon />,
      name: "Credit Card",
      color: "icon.secondary",
    },
    { icon: <TrendingDownIcon />, name: "Expense", color: "icon.red" },
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
          <Backdrop open={openDial} />

          <SpeedDialWrapper>
            <SpeedDial
              ariaLabel="Main Speed Dial"
              icon={<SpeedDialIcon />}
              direction="up"
              onClick={() => setOpenDial(!openDial)}
              open={openDial}
            >
              {actions.map((action, index) => {
                const positions = [
                  { left: "-85px", bottom: "40px" },
                  { left: "-30px", bottom: "65px" },
                  { left: "30px", bottom: "65px" },
                  { left: "85px", bottom: "40px" },
                ];
                return (
                  <SpeedDialAction
                    key={action.name}
                    icon={React.cloneElement(action.icon, {
                      sx: { color: action.color },
                    })}
                    onClick={() => setOpenDial(false)}
                    sx={{
                      position: "absolute",
                      ...positions[index],
                      backgroundColor: "secondary.main",
                    }}
                  />
                );
              })}
            </SpeedDial>
          </SpeedDialWrapper>

          {navigationElements.map(({ label, value, icon }) => (
            <BottomNavigationAction
              key={value}
              label={label}
              value={value}
              icon={icon}
            />
          ))}
        </BottomNavigationContent>
      </PaperContainer>
    </>
  ) : null;
};

/**
 * propTypes declaration for Navigation (currently unused but kept for future use)
 */
Navigation.propTypes = {};

export default Navigation;
