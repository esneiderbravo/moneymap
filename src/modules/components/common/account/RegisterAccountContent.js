import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Drawer,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Ajv from "ajv";
import addErrors from "ajv-errors";

import CommonHeaderContent from "../CommonHeaderContent";
import ColorSelector from "../ColorSelectorContent";

import {
  InputRegister,
  RegisterAccountContainer,
  RegisterBox,
  SelectRegister,
  SubmitButton,
} from "../../../styles/common/account/RegisterAccount.styled";

import { getIconComponent } from "../../../utils/common/icon";
import { getJsonSchema } from "../../../utils/jsonschema";
import { upsertAccount } from "../../../services/account/accountService";
import { setBalance, setNotification } from "../../../actions/state";
import { useAppContext } from "../../../providers/AppProvider";

/**
 * RegisterAccountContent
 *
 * This component renders a bottom drawer form used to register or edit an account.
 * It supports account types like checking, savings, and wallet, and includes validation
 * using JSON Schema (AJV), error handling, and integration with global app state.
 *
 * Props:
 * @param {boolean} isOpen - Indicates whether the drawer is open.
 * @param {function} handleClose - Function to handle closing the drawer.
 * @param {object} currentAccount - (Optional) The account object being edited.
 * @param {function} setCurrentAccount - (Optional) Callback to update the current account after saving.
 */
const RegisterAccountContent = ({
  isOpen,
  handleClose,
  currentAccount = null,
  setCurrentAccount = null,
}) => {
  const { dispatch, state } = useAppContext();
  const { balance, authData } = state;

  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Icons
  const MicIcon = getIconComponent("Mic");
  const AssuredWorkloadIcon = getIconComponent("AssuredWorkload");
  const ArrowForwardIosIcon = getIconComponent("ArrowForwardIos");
  const SavingsIcon = getIconComponent("Savings");
  const WalletIcon = getIconComponent("Wallet");

  const ACCENT_BG = "secondary.accent";

  /**
   * Handles input changes for the form fields and updates the local state.
   * Parses balance as a float if necessary.
   *
   * @param {object} event - The change event from input/select elements.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "balance" ? parseFloat(value) || 0 : value,
    }));
  };

  /**
   * Validates the formData using a JSON Schema defined in the project.
   * Utilizes AJV and custom error messages to produce user-friendly feedback.
   *
   * @returns {boolean} - Returns true if the form is valid; false otherwise.
   */
  const validateFormData = () => {
    const ajv = new Ajv({ allErrors: true });
    addErrors(ajv);

    const schema = getJsonSchema("registerAccount");
    const validate = ajv.compile(schema);
    const isValid = validate(formData);

    if (!isValid) {
      const fieldErrors = {};
      for (const err of validate.errors) {
        const field = err.instancePath.replace(/^\//, "");
        fieldErrors[field] = err.message || "Invalid input";
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  /**
   * Handles form submission for creating or updating an account.
   * Validates the form, sends data to the server, updates global state,
   * and provides user feedback via notifications.
   *
   * @param {object} e - The form submission event.
   */
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return;

    setSubmitting(true);
    let dataToSubmit = { userId: authData.id, ...formData };

    if (currentAccount) {
      dataToSubmit.id = currentAccount.id;
    }

    try {
      const { data, success } = await upsertAccount(dataToSubmit);

      if (!success) throw new Error("Account registration failed.");

      const updatedAccounts = currentAccount?.id
        ? balance.accounts.map((acc) => (acc.id === data.id ? data : acc))
        : [...balance.accounts, data];

      dispatch(setBalance({ ...balance, accounts: updatedAccounts }));

      dispatch(
        setNotification({
          type: "success",
          info: currentAccount
            ? "Account updated successfully!"
            : "New account created successfully!",
        })
      );

      setCurrentAccount?.(data);
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          info: error.message || "Something went wrong. Please try again.",
        })
      );
    } finally {
      setSubmitting(false);
      handleCloseLocal(e);
    }
  };

  /**
   * Local handler to reset errors and trigger the drawer close callback.
   *
   * @param {object} e - The close event.
   */
  const handleCloseLocal = (e) => {
    setErrors({});
    handleClose(e);
  };

  /**
   * Effect hook to populate form data when editing an account.
   */
  useEffect(() => {
    setFormData({
      balance: currentAccount?.balance ?? "",
      description: currentAccount?.description ?? "",
      type: currentAccount?.type ?? "checking",
      color: currentAccount?.color ?? "",
    });
  }, [currentAccount]);

  return (
    <Drawer
      key="RegisterAccount"
      open={isOpen}
      onClose={handleCloseLocal}
      anchor="bottom"
      disableAutoFocus
      ModalProps={{ keepMounted: true }}
    >
      <CommonHeaderContent
        handleClose={handleCloseLocal}
        title={currentAccount ? "Edit account" : "New Account"}
      />

      <RegisterBox component="form" onSubmit={handleSubmitForm}>
        <RegisterAccountContainer
          size={12}
          sx={{ backgroundColor: "secondary.main", height: "90vh" }}
        >
          {/* Balance */}
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
              fullWidth
              sx={{
                backgroundColor: ACCENT_BG,
                "&::placeholder": { color: "grey", opacity: 1 },
              }}
            />
            {errors.balance && (
              <FormHelperText sx={{ color: "error.main", fontWeight: "bold" }}>
                {errors.balance}
              </FormHelperText>
            )}
          </FormControl>

          {/* Description */}
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
              startAdornment={
                MicIcon && (
                  <InputAdornment position="start">
                    <MicIcon sx={{ color: "icon.white" }} />
                  </InputAdornment>
                )
              }
              fullWidth
              sx={{
                backgroundColor: ACCENT_BG,
                "&::placeholder": { color: "white", opacity: 1 },
              }}
            />
            {errors.description && (
              <FormHelperText sx={{ color: "error.main", fontWeight: "bold" }}>
                {errors.description}
              </FormHelperText>
            )}
          </FormControl>

          {/* Type */}
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
              fullWidth
              sx={{ backgroundColor: ACCENT_BG }}
              endAdornment={
                <InputAdornment position="end">
                  <ArrowForwardIosIcon sx={{ color: "icon.white" }} />
                </InputAdornment>
              }
            >
              <MenuItem value="checking" sx={{ color: "icon.white" }}>
                {AssuredWorkloadIcon && <AssuredWorkloadIcon sx={{ mr: 1 }} />}{" "}
                Checking
              </MenuItem>
              <MenuItem value="savings" sx={{ color: "icon.white" }}>
                {SavingsIcon && <SavingsIcon sx={{ mr: 1 }} />} Savings
              </MenuItem>
              <MenuItem value="wallet" sx={{ color: "icon.white" }}>
                {WalletIcon && <WalletIcon sx={{ mr: 1 }} />} Wallet
              </MenuItem>
            </SelectRegister>
            {errors.type && (
              <FormHelperText sx={{ color: "error.main", fontWeight: "bold" }}>
                {errors.type}
              </FormHelperText>
            )}
          </FormControl>

          {/* Color */}
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

          {/* Submit */}
          <SubmitButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: ACCENT_BG }}
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
  handleClose: PropTypes.func.isRequired,
  currentAccount: PropTypes.object,
  setCurrentAccount: PropTypes.func,
};

export default RegisterAccountContent;
