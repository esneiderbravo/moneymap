import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";
import { useAppContext } from "../../providers/AppProvider";

/**
 * Navigation Content Component (Fixed bottom navigation bar)
 * @returns {React.JSX.Element} Footer navigation bar with Home and Settings options
 */
const NavigationContent = ({ initialValue = "home" }) => {
  const [value, setValue] = useState(initialValue);
  const { state } = useAppContext();
  const { authData } = state;

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return authData ? (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  ) : null;
};

/**
 * NavigationContent propTypes
 */
NavigationContent.propTypes = {
  initialValue: PropTypes.string, // Optional initial value for selected tab
};

export default NavigationContent;
