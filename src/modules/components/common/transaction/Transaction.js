import useSwipeClose from "../../hooks/useSwipeClose";
import {
  Box,
  CircularProgress,
  Drawer,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import CommonHeader from "../CommonHeader";
import React, { useEffect, useState } from "react";
import {
  InputTransaction,
  SelectType,
  SubmitButton,
  TransactionBox,
  TransactionContainer,
} from "../../../styles/common/transaction/Transaction.styled";
import PropTypes from "prop-types";
import { formatCurrency } from "../../../utils/common/currency";
import NumericKeyboard from "../NumericKeyboard";
import { useTranslation } from "react-i18next";
import { getIconComponent } from "../../../utils/common/icon";
import { validateFormData } from "../../../utils/jsonschema";
import CustomDatePicker from "../../../utils/common/datepicker";
import { useAppContext } from "../../../providers/AppProvider";

/**
 * Transaction component renders a side drawer with a form to register different types of transactions
 * such as expense, income, credit card, or transfer.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Indicates if the drawer is open
 * @param {function} props.handleClose - Function to handle closing the drawer
 * @param {string} props.currentTransaction - Current transaction type (e.g. "expense", "income")
 */
const Transaction = ({ isOpen, handleClose, currentTransaction }) => {
  const { t } = useTranslation("transaction");
  const { state } = useAppContext();
  const { balance } = state;
  const { accounts = [] } = balance;

  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [openDatePickerModal, setOpenDatePickerModal] = useState(false);

  const ACCENT_BG = "secondary.accent";

  const ArrowForwardIosIcon = getIconComponent("ArrowForwardIos");
  const TrendingDownIcon = getIconComponent("TrendingDown");
  const TrendingUpIcon = getIconComponent("TrendingUp");
  const LoopIcon = getIconComponent("Loop");
  const AddCardIcon = getIconComponent("AddCard");
  const ReceiptIcon = getIconComponent("Receipt");
  const PaidIcon = getIconComponent("Paid");
  const CheckCircleIcon = getIconComponent("CheckCircle");
  const CalendarMonthIcon = getIconComponent("CalendarMonth");
  const AccountBalanceIcon = getIconComponent("AccountBalance");

  /**
   * Handles the form submission by validating the data and simulating a submit action.
   *
   * @async
   * @param {Event} e - Form submit event
   */
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateFormData("registerTransaction", formData, setErrors)) return;
    setSubmitting(true);
    console.log(formData);
    // Submit logic...
  };

  /**
   * Handles changes to form inputs including checkboxes and selects.
   *
   * @param {Event} event - Input change event
   */
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "amount") setActiveField("amount");

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  /**
   * Updates the amount field in the form when the numeric keyboard is used.
   *
   * @param {string | number} value - Numeric value selected
   */
  const setAmountField = (value) => {
    if (activeField === "amount") {
      setFormData((prev) => ({
        ...prev,
        amount: parseFloat(value),
      }));
      setActiveField(null);
    }
  };

  /**
   * Handles changes from the custom date picker and updates the form's date field.
   *
   * @param {string} date - Selected date value
   */
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
    console.log(date);
  };

  useSwipeClose({ isOpen, onClose: (event) => handleClose(event) });

  /**
   * Initializes the form data and resets submission state and errors
   * when the transaction type changes.
   *
   * @effect
   */
  useEffect(() => {
    setFormData({
      type: currentTransaction,
      amount: 0,
      paid: true,
      date: "",
      accountId: "",
    });
    setSubmitting(false);
    setErrors({});
  }, [currentTransaction]);

  return (
    <>
      <Drawer
        key="transaction"
        open={isOpen}
        onClose={handleClose}
        anchor="right"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        <CommonHeader handleClose={handleClose} title={t(currentTransaction)} />
        <TransactionBox component="form" onSubmit={handleSubmitForm}>
          <TransactionContainer
            size={12}
            sx={{ backgroundColor: "secondary.main", height: "100vh" }}
            mt={5}
          >
            {/* Type */}
            <FormControl
              variant="standard"
              fullWidth
              sx={{ mb: 6 }}
              error={!!errors.type}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {ReceiptIcon && <ReceiptIcon sx={{ color: "icon.white" }} />}
                <SelectType
                  id="type"
                  name="type"
                  value={formData.type || ""}
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
                  <MenuItem value="expense" sx={{ color: "icon.red" }}>
                    {TrendingDownIcon && <TrendingDownIcon sx={{ mr: 1 }} />}
                    {t("expense")}
                  </MenuItem>
                  <MenuItem value="income" sx={{ color: "icon.green" }}>
                    {TrendingUpIcon && <TrendingUpIcon sx={{ mr: 1 }} />}
                    {t("income")}
                  </MenuItem>
                  <MenuItem
                    value="credit_card"
                    sx={{ color: "icon.secondary" }}
                  >
                    {AddCardIcon && <AddCardIcon sx={{ mr: 1 }} />}
                    {t("credit_card")}
                  </MenuItem>
                  <MenuItem value="transfer" sx={{ color: "icon.blue" }}>
                    {LoopIcon && <LoopIcon sx={{ mr: 1 }} />}
                    {t("transfer")}
                  </MenuItem>
                </SelectType>
              </Box>
              {errors.type && (
                <FormHelperText
                  sx={{
                    marginLeft: "40px",
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.type}
                </FormHelperText>
              )}
            </FormControl>

            {/* Amount */}
            <FormControl
              variant="standard"
              fullWidth
              sx={{ mb: 6 }}
              error={!!errors.amount}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {PaidIcon && <PaidIcon sx={{ color: "icon.white" }} />}
                <InputTransaction
                  id="amount"
                  name="amount"
                  value={formatCurrency(formData.amount || 0)}
                  onClick={() => setActiveField("amount")}
                  fullWidth
                  inputProps={{ readOnly: true }}
                  sx={{
                    backgroundColor: ACCENT_BG,
                    "&::placeholder": { color: "grey", opacity: 1 },
                  }}
                />
              </Box>
              {errors.amount && (
                <FormHelperText
                  sx={{
                    marginLeft: "40px",
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.amount}
                </FormHelperText>
              )}
            </FormControl>

            {/* Paid */}
            <FormControl
              variant="standard"
              fullWidth
              sx={{ mb: 6 }}
              error={!!errors.paid}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {CheckCircleIcon && (
                  <CheckCircleIcon sx={{ color: "icon.white" }} />
                )}
                <Switch
                  id="paid"
                  name="paid"
                  checked={!!formData.paid}
                  onChange={handleInputChange}
                  slotProps={{
                    input: {
                      "aria-label": "controlled",
                    },
                  }}
                />
                <Typography color="text.white">
                  {formData.paid ? t("paid") : t("not_paid")}
                </Typography>
              </Box>
              {errors.paid && (
                <FormHelperText
                  sx={{
                    marginLeft: "40px",
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.paid}
                </FormHelperText>
              )}
            </FormControl>

            {/* Date */}
            <FormControl
              variant="standard"
              fullWidth
              sx={{ mb: 6 }}
              error={!!errors.date}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {CalendarMonthIcon && (
                  <CalendarMonthIcon sx={{ color: "icon.white" }} />
                )}
                <InputTransaction
                  id="date"
                  name="date"
                  value={formData.date || "DD/MM/YYYY"}
                  onClick={() => setOpenDatePickerModal(true)}
                  fullWidth
                  inputProps={{ readOnly: true }}
                  sx={{
                    backgroundColor: ACCENT_BG,
                    "&::placeholder": { color: "grey", opacity: 1 },
                  }}
                />
              </Box>
              {errors.date && (
                <FormHelperText
                  sx={{
                    marginLeft: "40px",
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.date}
                </FormHelperText>
              )}
            </FormControl>

            {/* Account Id */}
            <FormControl
              variant="standard"
              fullWidth
              sx={{ mb: 6 }}
              error={!!errors.accountId}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {AccountBalanceIcon && (
                  <AccountBalanceIcon sx={{ color: "icon.white" }} />
                )}
                <SelectType
                  id="accountId"
                  name="accountId"
                  value={formData.accountId || ""}
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
                  {accounts.map((acc) => (
                    <MenuItem
                      key={acc.id}
                      value={acc.id}
                      sx={{ color: "icon.white" }}
                    >
                      {acc.description}
                    </MenuItem>
                  ))}
                </SelectType>
              </Box>
              {errors.accountId && (
                <FormHelperText
                  sx={{
                    marginLeft: "40px",
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.accountId}
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
                t("save")
              )}
            </SubmitButton>
          </TransactionContainer>
        </TransactionBox>
      </Drawer>

      <NumericKeyboard
        isOpen={activeField === "amount"}
        handleClose={() => setActiveField(null)}
        setBalanceField={setAmountField}
      />
      <CustomDatePicker
        open={openDatePickerModal}
        handleClose={() => setOpenDatePickerModal(false)}
        setDate={handleDateChange}
      />
    </>
  );
};

Transaction.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentTransaction: PropTypes.string.isRequired,
};

export default Transaction;
