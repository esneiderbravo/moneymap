import React from "react";
import { BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppContext } from "../../providers/AppProvider";
import { setCurrentPage } from "../../actions/state";
import { useLocation, useNavigate } from "react-router-dom";
import LocalStorage from "../../utils/localStorage";
import {
  BottomNavigationContent,
  PaperContainer,
} from "../../styles/common/NavigationContent.styled";

/**
 * Navigation Content Component (Fixed bottom navigation bar)
 * @returns {React.JSX.Element} Footer navigation bar with Home and Settings options
 */
const NavigationContent = () => {
  const { state, dispatch } = useAppContext();
  const { authData, currentPage } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const navigationElements = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: <HomeIcon fontSize="large" />,
    },
    { label: "More", value: "more", icon: <MoreHorizIcon fontSize="large" /> },
  ];

  // Don't render if the current location is "/"
  if (location.pathname === "/") return null;

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
    </PaperContainer>
  ) : null;
};

/**
 * NavigationContent propTypes
 */
NavigationContent.propTypes = {};

export default NavigationContent;
