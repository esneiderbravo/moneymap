import React, { useState } from "react";
import { Drawer, FormControl, InputAdornment, MenuItem } from "@mui/material";
import CommonHeaderContent from "../../../common/CommonHeaderContent";
import PropTypes from "prop-types";
import { getIconComponent } from "../../../../utils/common/icon";
import {
  InputRegister,
  RegisterAccountContainer,
  RegisterBox,
  SelectRegister,
  SubmitButton,
} from "../../../../styles/more/manage/account/RegisterAccount.styled";
import ColorSelector from "../../../common/ColorSelectorContent";

/**
 * RegisterAccountContent Component
 *
 * Displays a drawer with a registration form for creating a new account.
 * Users can input account details such as balance, description, account type,
 * and color. This component also features a color selector for enhanced user
 * experience.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Indicates whether the drawer is open.
 * @param {Function} props.setRegisterAccount - Callback to update the register account state when the drawer is closed.
 * @returns {React.JSX.Element} The rendered RegisterAccountContent component.
 */
const RegisterAccountContent = ({ isOpen, setRegisterAccount }) => {
  const [formData, setFormData] = useState({
    balance: "",
    description: "",
    type: "checking",
    color: "",
  });

  // Define icons
  const MicIcon = getIconComponent("Mic");
  const AssuredWorkloadIcon = getIconComponent("AssuredWorkload");
  const ArrowForwardIosIcon = getIconComponent("ArrowForwardIos");
  const SavingsIcon = getIconComponent("Savings");

  /**
   * Handles closing the drawer.
   * @param {React.MouseEvent} event - The event triggered on closing the drawer.
   */
  const handleClose = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    setRegisterAccount(false);
  };

  /**
   * Handles input changes in the form.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event triggered on input change.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      anchor="bottom"
      disableAutoFocus
    >
      <CommonHeaderContent handleClose={handleClose} title="New Account" />

      <RegisterBox component="form" onSubmit={() => {}}>
        <RegisterAccountContainer sx={{ backgroundColor: "secondary.main" }}>
          {/* Balance Input */}
          <FormControl variant="standard" fullWidth sx={{ mb: 6 }}>
            <InputRegister
              id="balance"
              name="balance"
              type="number"
              value={formData.balance}
              onChange={handleInputChange}
              placeholder="Current account balance..."
              sx={{
                backgroundColor: "secondary.accent",
                "&::placeholder": {
                  color: "grey",
                  opacity: 1,
                },
              }}
              fullWidth
            />
          </FormControl>

          {/* Description Input */}
          <FormControl variant="standard" fullWidth sx={{ mb: 6 }}>
            <InputRegister
              id="description"
              name="description"
              placeholder="Description..."
              value={formData.description}
              onChange={handleInputChange}
              sx={{
                backgroundColor: "secondary.accent",
                "&::placeholder": {
                  color: "white",
                  opacity: 1,
                },
              }}
              startAdornment={
                MicIcon && (
                  <InputAdornment position="start">
                    <MicIcon sx={{ color: "icon.white" }} />
                  </InputAdornment>
                )
              }
              fullWidth
            />
          </FormControl>

          {/* Type Selector */}
          <FormControl variant="standard" fullWidth sx={{ mb: 6 }}>
            <SelectRegister
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              displayEmpty
              sx={{ backgroundColor: "secondary.accent" }}
              endAdornment={
                <InputAdornment position="end">
                  <ArrowForwardIosIcon sx={{ color: "icon.white" }} />
                </InputAdornment>
              }
              fullWidth
            >
              <MenuItem
                value="checking"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {AssuredWorkloadIcon && (
                  <AssuredWorkloadIcon sx={{ marginRight: 1 }} />
                )}
                Checking
              </MenuItem>
              <MenuItem
                value="savings"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {SavingsIcon && <SavingsIcon sx={{ marginRight: 1 }} />} Savings
              </MenuItem>
            </SelectRegister>
          </FormControl>

          {/* Color Selector */}
          <ColorSelector onColorChange={setFormData} formData={formData} />

          {/* Submit Button */}
          <SubmitButton
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Register Account
          </SubmitButton>
        </RegisterAccountContainer>
      </RegisterBox>
    </Drawer>
  );
};

RegisterAccountContent.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Controls visibility of the drawer
  setRegisterAccount: PropTypes.func.isRequired, // Callback to close the drawer
};

export default RegisterAccountContent;
