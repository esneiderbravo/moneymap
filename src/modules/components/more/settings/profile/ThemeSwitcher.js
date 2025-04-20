import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Typography, MenuItem, InputAdornment } from "@mui/material";
import { getIconComponent } from "../../../../utils/common/icon";
import useSwipeClose from "../../../hooks/useSwipeClose";
import { useThemeContext } from "../../../../contexts/theme";
import {
  SaveButton,
  SelectModal,
  SwitcherContainer,
} from "../../../../styles/common/CommonContainers.styled";
import { useTranslation } from "react-i18next";

/**
 * ThemeSwitcher Component
 *
 * This component renders a modal dialog that allows users to switch between light and dark themes.
 * It provides functionality for selecting the desired theme, with a save action and swipe-to-close support.
 *
 * @component
 * @param {Object} props - React component props.
 * @param {boolean} props.open - A boolean value controlling whether the dialog is open or closed.
 * @param {function} props.setOpen - A function to update the open state of the dialog.
 * @returns {JSX.Element} Theme switcher modal dialog
 */
const ThemeSwitcher = ({ open, setOpen }) => {
  // Translation hook for multi-language support
  const { t } = useTranslation("theme_switcher");

  // Access the current theme mode and toggle function from the theme context
  const { mode, toggleTheme } = useThemeContext();

  // Local state for managing the selected theme (light or dark)
  const [selectedTheme, setSelectedTheme] = useState(mode);

  // Dynamically fetch the arrow icon component
  const ArrowForwardIosIcon = getIconComponent("ArrowForwardIos");

  /**
   * Handles the save action.
   * When the user saves, it applies the selected theme and closes the dialog.
   */
  const handleSave = () => {
    toggleTheme(selectedTheme); // Apply the selected theme
    setOpen(false); // Close the dialog
  };

  // Hook to enable swipe-to-close behavior for the dialog on mobile screens
  useSwipeClose({
    isOpen: open,
    onClose: () => setOpen(false),
  });

  return (
    <Dialog
      onClose={() => setOpen(false)} // Close dialog when triggered
      open={open} // Controls dialog visibility
      fullWidth // Makes the dialog span the full width
    >
      <SwitcherContainer
        variant="standard"
        sx={{ backgroundColor: "secondary.main" }}
      >
        {/* Header Title */}
        <Typography sx={{ mb: 2, color: "text.primary" }}>
          {t("select_theme")}
        </Typography>

        {/* Dropdown (Select) component for theme selection */}
        <SelectModal
          id="theme-switcher"
          name="theme-switcher"
          value={selectedTheme} // Binds selection to component state
          onChange={(e) => setSelectedTheme(e.target.value)} // Updates state on selection
          fullWidth
          aria-label="Theme selector"
          sx={{
            backgroundColor: "secondary.accent",
            "& .MuiSelect-select": {
              color: "text.info", // Custom text color for dropdown
            },
          }}
          endAdornment={
            // Adds an end icon to the dropdown
            <InputAdornment position="end">
              <ArrowForwardIosIcon sx={{ color: "icon.white" }} />
            </InputAdornment>
          }
        >
          {/* Menu items for theme selection */}
          <MenuItem
            value="dark"
            sx={{
              color: "icon.white", // White text color for dark theme option
            }}
          >
            {t("dark")} {/* Translated label for "dark" */}
          </MenuItem>
          <MenuItem
            value="light"
            sx={{
              color: "icon.white", // White text color for light theme option
            }}
          >
            {t("light")} {/* Translated label for "light" */}
          </MenuItem>
        </SelectModal>

        {/* Save button for applying the selected theme */}
        <SaveButton
          variant="contained"
          onClick={handleSave} // Calls handleSave on click
          fullWidth
        >
          {t("save")} {/* Translated label for "save" */}
        </SaveButton>
      </SwitcherContainer>
    </Dialog>
  );
};

// PropTypes validation for the component props
ThemeSwitcher.propTypes = {
  open: PropTypes.bool.isRequired, // `open` must be a boolean value
  setOpen: PropTypes.func.isRequired, // `setOpen` must be a function
};

// Export the component for use in other parts of the application
export default ThemeSwitcher;
