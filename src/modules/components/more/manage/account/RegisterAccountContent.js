import React, { useState } from "react";
import {
  CircularProgress,
  Drawer,
  FormControl,
  InputAdornment,
  MenuItem,
  FormHelperText,
} from "@mui/material";
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
import { getJsonSchema } from "../../../../utils/jsonschema";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import { registerAccount } from "../../../../services/account/accountService";
import { setBalance, setNotification } from "../../../../actions/state";
import { useAppContext } from "../../../../providers/AppProvider";

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
  const { dispatch, state } = useAppContext();
  const { balance, authData } = state;
  const [formData, setFormData] = useState({
    balance: "",
    description: "",
    type: "checking",
    color: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "balance" ? parseFloat(value) || 0 : value,
    }));
  };

  /**
   * Validates form data against the defined JSON schema.
   * @returns {boolean} True if valid, otherwise false and sets errors.
   */
  const validateFormData = () => {
    const ajv = new Ajv({ allErrors: true });
    addErrors(ajv);
    const formSchema = getJsonSchema("registerAccount");
    const validate = ajv.compile(formSchema);

    const valid = validate(formData);

    if (!valid) {
      const errorMessages = {};

      validate.errors.forEach((err) => {
        const field = err.instancePath.replace(/^\//, "");
        errorMessages[field] = err.message || "Invalid input";
      });

      setErrors(errorMessages);
      console.error(errorMessages);
      return false;
    }

    setErrors({});
    return true;
  };

  /**
   * Handles form submission by validating data and registering a new account.
   *
   * @async
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (!validateFormData()) return;

    setSubmitting(true);
    let formDataUpdated = { userId: authData.id, ...formData };
    try {
      const { data, success } = await registerAccount(formDataUpdated);

      if (!success) {
        throw new Error("Account registration failed.");
      }
      dispatch(
        setNotification({
          type: "success",
          info: "New account created successfully!",
        })
      );
      let newBalance = { ...balance };
      newBalance.accounts.push(data);
      dispatch(setBalance(newBalance));
    } catch (error) {
      console.error("Account Registration Error:", error.message);

      dispatch(
        setNotification({
          type: "error",
          info: error.message || "Something went wrong. Please try again.",
        })
      );
    } finally {
      setSubmitting(false);
      setRegisterAccount(false);
    }
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      anchor="bottom"
      disableAutoFocus
      ModalProps={{ keepMounted: true }}
    >
      <CommonHeaderContent handleClose={handleClose} title="New Account" />

      <RegisterBox component="form" onSubmit={handleSubmitForm}>
        <RegisterAccountContainer
          size={12}
          sx={{ backgroundColor: "secondary.main", height: "90vh" }}
        >
          {/* Balance Input */}
          <FormControl
            variant="standard"
            fullWidth
            sx={{ mb: 6 }}
            error={!!errors.balance}
          >
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
            {errors.balance && (
              <FormHelperText sx={{ color: "error.main", fontWeight: "bold" }}>
                {errors.balance}
              </FormHelperText>
            )}
          </FormControl>

          {/* Description Input */}
          <FormControl
            variant="standard"
            fullWidth
            sx={{ mb: 6 }}
            error={!!errors.description}
          >
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
            {errors.description && (
              <FormHelperText sx={{ color: "error.main", fontWeight: "bold" }}>
                {errors.description}
              </FormHelperText>
            )}
          </FormControl>

          {/* Type Selector */}
          <FormControl
            variant="standard"
            fullWidth
            sx={{ mb: 6 }}
            error={!!errors.type}
          >
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "icon.white",
                }}
              >
                {AssuredWorkloadIcon && (
                  <AssuredWorkloadIcon sx={{ marginRight: 1 }} />
                )}{" "}
                Checking
              </MenuItem>
              <MenuItem
                value="savings"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "icon.white",
                }}
              >
                {SavingsIcon && <SavingsIcon sx={{ marginRight: 1 }} />} Savings
              </MenuItem>
            </SelectRegister>
            {errors.type && (
              <FormHelperText sx={{ color: "error.main", fontWeight: "bold" }}>
                {errors.type}
              </FormHelperText>
            )}
          </FormControl>

          {/* Color Selector */}
          <FormControl
            variant="standard"
            fullWidth
            sx={{ mb: 6 }}
            error={!!errors.color}
          >
            <ColorSelector onColorChange={setFormData} formData={formData} />
            {errors.color && (
              <FormHelperText sx={{ color: "error.main", fontWeight: "bold" }}>
                {errors.color}
              </FormHelperText>
            )}
          </FormControl>

          {/* Submit Button */}
          <SubmitButton
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "secondary.accent" }}
            onClick={handleSubmitForm}
          >
            {submitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Account"
            )}
          </SubmitButton>
        </RegisterAccountContainer>
      </RegisterBox>
    </Drawer>
  );
};

RegisterAccountContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setRegisterAccount: PropTypes.func.isRequired,
};

export default RegisterAccountContent;
