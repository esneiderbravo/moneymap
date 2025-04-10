import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Drawer, Typography, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { formatCurrency } from "../../utils/common/currency";
import {
  BoxAmount,
  StyledDrawerPaper,
} from "../../styles/common/NumericKeyboard.styled";
import { useTranslation } from "react-i18next";

const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

/**
 * NumericKeyboard component
 *
 * Renders a numeric keypad inside a MUI Drawer that allows the user to input a numeric value.
 * This value is then passed to the parent component through the `setBalanceField` callback.
 * The component includes number buttons, a delete icon, and Cancel/Done buttons.
 *
 * Props:
 * @param {boolean} isOpen - Controls whether the drawer is open.
 * @param {function} handleClose - Function to close the drawer.
 * @param {function} setBalanceField - Callback to set the value inputted in the numeric keyboard.
 */
const NumericKeyboard = ({ isOpen, handleClose, setBalanceField }) => {
  const { t } = useTranslation("keyboard");
  const [input, setInput] = useState("");

  /**
   * Handles number key presses.
   *
   * @param {string} key - The number key that was pressed.
   * Appends the key to the current input state.
   */
  const handleKeyClick = (key) => {
    if (key) {
      setInput((prev) => prev + key);
    }
  };

  /**
   * Removes the last digit from the input.
   * Called when the delete icon is pressed.
   */
  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  /**
   * Finalizes the input and passes it to the parent via setBalanceField.
   * Then clears the local input and closes the drawer.
   */
  const handleDone = () => {
    setBalanceField(input);
    setInput("");
    handleClose();
  };

  return (
    // Drawer wraps the entire keyboard interface
    <Drawer
      key="NumericKeyboard"
      open={isOpen}
      onClose={handleClose}
      anchor="bottom"
      disableAutoFocus
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        component: StyledDrawerPaper,
      }}
    >
      <Box>
        {/* Displays the formatted input and delete button */}
        <BoxAmount sx={{ backgroundColor: "secondary.accent" }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            {formatCurrency(input)}
          </Typography>
          {input && (
            <IconButton onClick={handleDelete} color="primary">
              <BackspaceIcon />
            </IconButton>
          )}
        </BoxAmount>

        {/* Numeric keys in a 3x3 grid */}
        {keys.map((row, rowIndex) => (
          <Grid2 container key={rowIndex} spacing={1} justifyContent="center">
            {row.map((key, index) => (
              <Grid2 item size={4} key={`${key}-${index}`}>
                <Button
                  variant="contained"
                  onClick={() => handleKeyClick(key)}
                  fullWidth
                  sx={{
                    fontSize: "1.5rem",
                    py: 1.5,
                    mb: 1,
                    backgroundColor: "icon.info",
                  }}
                  disabled={!key}
                >
                  {key}
                </Button>
              </Grid2>
            ))}
          </Grid2>
        ))}

        {/* Single row for "0" key */}
        <Grid2 container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
          <Grid2 item size={4}>
            <Button
              variant="contained"
              onClick={() => handleKeyClick("0")}
              fullWidth
              sx={{
                fontSize: "1.5rem",
                py: 1.5,
                backgroundColor: "icon.info",
              }}
            >
              0
            </Button>
          </Grid2>
        </Grid2>

        {/* Cancel and Done buttons */}
        <Grid2 container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid2 item size={6}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setInput("");
                handleClose();
              }}
              fullWidth
              sx={{ py: 1.5, textTransform: "none", borderRadius: 5 }}
            >
              {t("cancel")}
            </Button>
          </Grid2>
          <Grid2 item size={6}>
            <Button
              variant="contained"
              onClick={handleDone}
              fullWidth
              sx={{
                py: 1.5,
                textTransform: "none",
                backgroundColor: "icon.info",
                borderRadius: 5,
              }}
              disabled={!input}
            >
              {t("done")}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Drawer>
  );
};

/**
 * PropTypes for NumericKeyboard.
 */
NumericKeyboard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setBalanceField: PropTypes.func.isRequired,
};

export default NumericKeyboard;
