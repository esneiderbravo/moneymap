import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppContext } from "../../providers/AppProvider";
import { setCurrentPage } from "../../actions/state";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../utils/localStorage";

/**
 * Navigation Content Component (Fixed bottom navigation bar)
 * @returns {React.JSX.Element} Footer navigation bar with Home and Settings options
 */
const NavigationContent = () => {
  const { state, dispatch } = useAppContext();
  const { authData, currentPage } = state;
  const navigate = useNavigate();
  const navigationElements = [
    { label: "Dashboard", value: "dashboard", icon: <HomeIcon /> },
    { label: "More", value: "more", icon: <MoreHorizIcon /> },
  ];

  /**
   * Handles changes in the bottom navigation selection.
   * @param {Event} _ - The event object (unused).
   * @param {string} newValue - The new selected value.
   */
  const handleChange = (_, newValue) => {
    dispatch(setCurrentPage(newValue));
    LocalStorage.setItem("currentPage", newValue);
    navigate("/" + newValue);
  };

  return authData ? (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={currentPage} onChange={handleChange}>
        {navigationElements.map(({ label, value, icon }) => (
          <BottomNavigationAction
            key={value}
            label={label}
            value={value}
            icon={icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  ) : null;
};

/**
 * NavigationContent propTypes
 */
NavigationContent.propTypes = {};

export default NavigationContent;
