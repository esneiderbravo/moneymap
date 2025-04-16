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
import { ACCOUNTS_ICON_MAPPER } from "../../../utils/constants";
import { setNotification } from "../../../actions/state";

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
  const { state, dispatch } = useAppContext();
  const { balance, categories } = state;
  const { accounts = [] } = balance;
  const currentCategories = categories[currentTransaction] || [];

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
  const PaidIcon = getIconComponent("Paid");
  const CheckCircleIcon = getIconComponent("CheckCircle");
  const CalendarMonthIcon = getIconComponent("CalendarMonth");
  const AccountBalanceIcon = getIconComponent("AccountBalance");
  const CategoryIcon = getIconComponent("Category");

  const typeOptions = [
    {
      icon: TrendingDownIcon,
      name: t("expense"),
      color: "icon.red",
      value: "expense",
    },
    {
      icon: TrendingUpIcon,
      name: t("income"),
      color: "icon.green",
      value: "income",
    },
    {
      icon: AddCardIcon,
      name: t("credit_card"),
      color: "icon.secondary",
      value: "credit_card",
    },
    {
      icon: LoopIcon,
      name: t("transfer"),
      color: "icon.blue",
      value: "transfer",
    },
  ];

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
    if (!validateExpenseTransaction(formData)) {
      dispatch(
        setNotification({
          type: "error",
          info: t("balance_error"),
        })
      );
      setSubmitting(false);
      return;
    }
    console.log(formData);
  };

  const validateExpenseTransaction = (formData) => {
    const { amount, accountId, type, paid } = formData;
    const account = accounts.find((account) => account.id === accountId);
    const accountBalance = account.balance;
    return !(["expense"].includes(type) && paid && amount > accountBalance);
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
      categoryId: "",
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
              sx={{ mb: 6, display: "none" }}
              error={!!errors.type}
            >
              <Box display="flex" alignItems="center" gap={2}>
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
                  {typeOptions.map((option, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={option.value}
                        sx={{ color: `${option.color}` }}
                      >
                        {option.icon && (
                          <option.icon
                            sx={{ color: `${option.color}`, mr: 1 }}
                          />
                        )}
                        {option.name}
                      </MenuItem>
                    );
                  })}
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
                  startAdornment={
                    PaidIcon && <PaidIcon sx={{ color: "icon.white", mr: 1 }} />
                  }
                />
              </Box>
              {errors.amount && (
                <FormHelperText
                  sx={{
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
                {/* Icon */}
                {CheckCircleIcon && (
                  <CheckCircleIcon sx={{ color: "icon.white" }} />
                )}

                {/* Label Text */}
                <Typography color="text.white">
                  {formData.paid ? t("paid") : t("not_paid")}
                </Typography>

                {/* Align Switch to the right */}
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
                  sx={{
                    ml: "auto", // Pushes the switch to the right
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "icon.white", // Default thumb color
                    },
                    "& .Mui-checked": {
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "icon.green", // Thumb color when checked
                      },
                    },
                  }}
                />
              </Box>

              {/* Error message */}
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
                <InputTransaction
                  id="date"
                  name="date"
                  value={formData.date || ""}
                  placeholder={t("pick_date")}
                  onClick={() => setOpenDatePickerModal(true)}
                  fullWidth
                  inputProps={{ readOnly: true }}
                  sx={{
                    backgroundColor: ACCENT_BG,
                    "&::placeholder": { color: "grey", opacity: 1 },
                  }}
                  startAdornment={
                    CalendarMonthIcon && (
                      <CalendarMonthIcon sx={{ color: "icon.white", mr: 1 }} />
                    )
                  }
                />
              </Box>
              {errors.date && (
                <FormHelperText
                  sx={{
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.date}
                </FormHelperText>
              )}
            </FormControl>

            {/* Account ID */}
            <FormControl
              variant="standard"
              fullWidth
              sx={{ mb: 6 }}
              error={!!errors.accountId}
            >
              <Box display="flex" alignItems="center" gap={2}>
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
                  <MenuItem value="" disabled sx={{ color: "grey.500" }}>
                    {AccountBalanceIcon && (
                      <AccountBalanceIcon sx={{ color: "icon.white", mr: 1 }} />
                    )}
                    {t("pick_account")}{" "}
                  </MenuItem>
                  {accounts.map((account) => {
                    const IconComponent = getIconComponent(
                      ACCOUNTS_ICON_MAPPER[account.type]
                    );
                    return (
                      <MenuItem
                        key={account.id}
                        value={account.id}
                        sx={{ color: `${account.color}` }}
                      >
                        {IconComponent && (
                          <IconComponent
                            sx={{ color: `${account.color}`, mr: 1 }}
                          />
                        )}
                        {account.description}
                      </MenuItem>
                    );
                  })}
                </SelectType>
              </Box>
              {errors.accountId && (
                <FormHelperText
                  sx={{
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.accountId}
                </FormHelperText>
              )}
            </FormControl>

            {/* Category ID */}
            <FormControl
              variant="standard"
              fullWidth
              sx={{ mb: 6 }}
              error={!!errors.accountId}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <SelectType
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId || ""}
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
                  <MenuItem value="" disabled sx={{ color: "grey.500" }}>
                    {CategoryIcon && (
                      <CategoryIcon sx={{ color: "icon.white", mr: 1 }} />
                    )}
                    {t("pick_category")}{" "}
                  </MenuItem>
                  {currentCategories.map((category) => {
                    const IconComponent = getIconComponent(category.icon);
                    return (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        sx={{ color: `${category.color}` }}
                      >
                        {IconComponent && (
                          <IconComponent
                            sx={{ color: `${category.color}`, mr: 1 }}
                          />
                        )}
                        {t(`${category.type}_categories.${category.name}`)}
                      </MenuItem>
                    );
                  })}
                </SelectType>
              </Box>
              {errors.categoryId && (
                <FormHelperText
                  sx={{
                    color: "error.main",
                    fontWeight: "bold",
                  }}
                >
                  {errors.categoryId}
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
                t("submit")
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
