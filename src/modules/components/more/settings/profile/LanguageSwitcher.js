import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Dialog, InputAdornment, MenuItem, Typography } from "@mui/material";
import { getIconComponent } from "../../../../utils/common/icon";
import useSwipeClose from "../../../hooks/useSwipeClose";
import {
  SaveButton,
  SelectModal,
  SwitcherContainer,
} from "../../../../styles/common/CommonContainers.styled";

/**
 * LanguageSwitcher Component
 *
 * Renders a modal dialog that allows users to select and save their preferred language.
 * Supports English and Spanish. When a language is selected and saved, it updates i18next
 * and persists the setting to localStorage.
 *
 * @component
 * @param {Object} props - React component props
 * @param {boolean} props.open - Controls whether the dialog is open
 * @param {function} props.setOpen - Function to set the open state of the dialog
 * @returns {JSX.Element} Language switcher modal dialog
 */
const LanguageSwitcher = ({ open, setOpen }) => {
  const { i18n, t } = useTranslation("language_switcher");

  /**
   * Local state to hold the currently selected language before saving
   * @type {[string, function]}
   */
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  // Icon for dropdown adornment
  const ArrowForwardIosIcon = getIconComponent("ArrowForwardIos");

  /**
   * Handles saving the selected language:
   * - Updates the i18n language
   * - Persists language to localStorage
   * - Closes the modal
   */
  const handleSave = () => {
    i18n.changeLanguage(selectedLang);
    setOpen(false);
  };

  useSwipeClose({
    isOpen: open,
    onClose: () => setOpen(false),
  });

  return (
    <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
      <SwitcherContainer variant="standard">
        {/* Modal title */}
        <Typography sx={{ mb: 2, color: "text.primary" }}>
          {t("title")}
        </Typography>

        {/* Language selector dropdown */}
        <SelectModal
          id="language-switcher"
          name="language-switcher"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          fullWidth
          aria-label="Language selector"
          sx={{ backgroundColor: "secondary.accent" }}
          endAdornment={
            <InputAdornment position="end">
              <ArrowForwardIosIcon sx={{ color: "icon.white" }} />
            </InputAdornment>
          }
        >
          <MenuItem value="en">{t("en")}</MenuItem>
          <MenuItem value="es">{t("es")}</MenuItem>
        </SelectModal>

        {/* Save button */}
        <SaveButton variant="contained" onClick={handleSave} fullWidth>
          {t("save")}
        </SaveButton>
      </SwitcherContainer>
    </Dialog>
  );
};

LanguageSwitcher.propTypes = {
  /** Controls whether the dialog is open */
  open: PropTypes.bool.isRequired,

  /** Function to toggle the open state of the dialog */
  setOpen: PropTypes.func.isRequired,
};

export default LanguageSwitcher;
