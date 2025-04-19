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

import CommonHeader from "../CommonHeader";
import ColorSelector from "../ColorSelector";

import {
  InputRegister,
  RegisterAccountContainer,
  RegisterBox,
  SelectRegister,
  SubmitButton,
} from "../../../styles/common/account/RegisterAccount.styled";

import { getIconComponent } from "../../../utils/common/icon";
import { upsertAccount } from "../../../services/account/accountService";
import { setBalance, setNotification } from "../../../actions/state";
import { useAppContext } from "../../../providers/AppProvider";
import NumericKeyboard from "../NumericKeyboard";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../../utils/common/currency";
import useSwipeClose from "../../hooks/useSwipeClose";
import { validateFormData } from "../../../utils/jsonschema";

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
const RegisterAccount = ({
  isOpen,
  handleClose,
  currentAccount = null,
  setCurrentAccount = null,
}) => {
  const { t } = useTranslation("register_account");
  const { dispatch, state } = useAppContext();
  const { balance, authData } = state;

  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState(null);

  // Icons
  const DescriptionIcon = getIconComponent("Description");
  const AssuredWorkloadIcon = getIconComponent("AssuredWorkload");
  const ArrowForwardIosIcon = getIconComponent("ArrowForwardIos");
  const SavingsIcon = getIconComponent("Savings");
  const WalletIcon = getIconComponent("Wallet");

  const ACCENT_BG = "primary.main";

  /**
   * Handles input changes for the form fields and updates the local state.
   * Parses balance as a float if necessary.
   *
   * @param {object} event - The change event from input/select elements.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "balance") {
      setActiveField("balance");
    }

    if (name !== "balance") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    if (!validateFormData("registerAccount", formData, setErrors)) return;

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

      const updatedTotalBalanceAmount = updatedAccounts.reduce(
        (sum, acc) => sum + (parseFloat(acc.balance) || 0),
        0
      );

      dispatch(
        setBalance({
          ...balance,
          accounts: updatedAccounts,
          totalBalanceAmount: updatedTotalBalanceAmount,
        })
      );

      dispatch(
        setNotification({
          type: "success",
          info: currentAccount
            ? t("update_account_success")
            : t("create_account_success"),
        })
      );

      setCurrentAccount?.(data);
    } catch (error) {
      console.error("❌ Error fetching balances:", error);
      dispatch(
        setNotification({
          type: "error",
          info: t("submit_error"),
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
    setFormData({
      balance: 0,
      description: "",
      type: "checking",
      color: "",
    });
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

  /**
   * Handles setting the balance field after numeric keyboard entry.
   *
   * @param {string|number} value - Value returned from NumericKeyboard.
   */
  const setBalanceField = (value) => {
    if (activeField === "balance") {
      setFormData((prev) => {
        return { ...prev, balance: parseFloat(value) };
      });
      setActiveField(null);
    }
  };

  useSwipeClose({
    isOpen: isOpen,
    onClose: (event) => handleCloseLocal(event),
  });

  return (
    <>
      <Drawer
        key="RegisterAccount"
        open={isOpen}
        onClose={handleCloseLocal}
        anchor="bottom"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        <CommonHeader
          handleClose={handleCloseLocal}
          title={currentAccount ? t("edit") : t("create")}
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
                value={formatCurrency(formData.balance || 0)}
                onClick={() => setActiveField("balance")}
                placeholder={t("balance_description")}
                fullWidth
                inputProps={{ readOnly: true }} // prevent native keyboard
                sx={{
                  backgroundColor: ACCENT_BG,
                  "& .MuiInputBase-input": { color: "text.info" },
                }}
              />
              {errors.balance && (
                <FormHelperText
                  sx={{ color: "text.error", fontWeight: "bold" }}
                >
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
                placeholder={t("description")}
                value={formData.description}
                onChange={handleInputChange}
                startAdornment={
                  DescriptionIcon && (
                    <InputAdornment position="start">
                      <DescriptionIcon sx={{ color: "icon.white" }} />
                    </InputAdornment>
                  )
                }
                fullWidth
                sx={{
                  backgroundColor: ACCENT_BG,
                  "&::placeholder": { color: "text.info", opacity: 1 },
                }}
              />
              {errors.description && (
                <FormHelperText
                  sx={{ color: "text.error", fontWeight: "bold" }}
                >
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
                sx={{
                  backgroundColor: ACCENT_BG,
                  "& .MuiSelect-select": {
                    color: "text.info",
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <ArrowForwardIosIcon sx={{ color: "icon.white" }} />
                  </InputAdornment>
                }
              >
                <MenuItem
                  value="checking"
                  sx={{
                    color: "icon.white",
                  }}
                >
                  {AssuredWorkloadIcon && (
                    <AssuredWorkloadIcon sx={{ mr: 1 }} />
                  )}{" "}
                  {t("checking")}
                </MenuItem>
                <MenuItem value="savings" sx={{ color: "icon.white" }}>
                  {SavingsIcon && <SavingsIcon sx={{ mr: 1 }} />} {t("savings")}
                </MenuItem>
                <MenuItem value="wallet" sx={{ color: "icon.white" }}>
                  {WalletIcon && <WalletIcon sx={{ mr: 1 }} />} {t("wallet")}
                </MenuItem>
              </SelectRegister>
              {errors.type && (
                <FormHelperText
                  sx={{ color: "text.error", fontWeight: "bold" }}
                >
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
                <FormHelperText
                  sx={{ color: "text.error", fontWeight: "bold" }}
                >
                  {errors.color}
                </FormHelperText>
              )}
            </FormControl>

            {/* Submit */}
            <SubmitButton type="submit" variant="contained" fullWidth>
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("save")
              )}
            </SubmitButton>
          </RegisterAccountContainer>
        </RegisterBox>
      </Drawer>
      <NumericKeyboard
        isOpen={activeField === "balance"}
        handleClose={() => setActiveField(null)}
        setBalanceField={setBalanceField}
      />
    </>
  );
};

RegisterAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentAccount: PropTypes.object,
  setCurrentAccount: PropTypes.func,
};

export default RegisterAccount;
