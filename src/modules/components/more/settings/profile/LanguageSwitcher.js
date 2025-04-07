import React from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputAdornment, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { getIconComponent } from "../../../../utils/common/icon";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const ArrowForwardIosIcon = getIconComponent("ArrowForwardIos");

  return (
    <FormControl variant="standard" fullWidth sx={{ mb: 6 }}>
      <Select
        id="language-switcher"
        name="language-switcher"
        value={i18n.language}
        variant="standard"
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        fullWidth
        sx={{ backgroundColor: "secondary.accent" }}
        endAdornment={
          <InputAdornment position="end">
            <ArrowForwardIosIcon sx={{ color: "icon.white" }} />
          </InputAdornment>
        }
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
