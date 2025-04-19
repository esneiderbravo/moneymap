import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Drawer, Typography, IconButton } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  BoxAmount,
  StyledDrawerPaper,
} from "../../styles/common/NumericKeyboard.styled";
import { formatCurrency } from "../../utils/common/currency";
import { useTranslation } from "react-i18next";

/**
 * Numeric Keyboard Component
 *
 * This component renders a numeric keypad along with a display for numeric input inside an MUI `Drawer`.
 * It is designed to be responsive, adjusting the height and width of the keyboard and buttons dynamically based on the viewport dimensions.
 *
 * Props:
 * - `isOpen` (bool): Controls whether the numeric keyboard is open (visible) or closed.
 * - `handleClose` (function): Callback fired when the drawer is closed.
 * - `setBalanceField` (function): Callback receiving the numeric value entered into the keyboard when the "Done" button is clicked.
 *
 * Features:
 * - Fully responsive design, dynamically adjusting button and font sizes for different screen sizes.
 * - Displays the numeric input at the top and allows users to format it (e.g., as currency).
 * - Functional numeric keys (0–9), a backspace button, and "Cancel" and "Done" options.
 * - Dynamic height adjustment based on 50% of the device's viewport height.
 *
 * Dependencies:
 * - MUI components such as `Drawer`, `Button`, `Box`, and `Typography`.
 * - Translation functionality powered by `i18next`.
 */
const NumericKeyboard = ({ isOpen, handleClose, setBalanceField }) => {
  const { t } = useTranslation("keyboard");

  /**
   * State to hold the numeric input value entered via the keyboard.
   */
  const [input, setInput] = useState("");

  /**
   * State to hold dynamic button dimensions based on the viewport size.
   */
  const [keyboardDimensions, setKeyboardDimensions] = useState({
    buttonHeight: 20, // Default height of each button
    fontSize: 18, // Default font size inside the buttons
  });

  /**
   * Numeric keypad layout for keys (0–9).
   * Divided into rows to enable flexible rendering.
   */
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0"], // Last row with a single "0" key
  ];

  /**
   * Lifecycle hook to calculate dynamic button sizes based on the device viewport.
   * This updates on component mount, and when the viewport is resized, to ensure proper responsiveness.
   */
  useEffect(() => {
    const calculateDimensions = () => {
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight; // Get viewport height
      const viewportWidth = window.visualViewport?.width || window.innerWidth; // Get viewport width

      // Height allocated for the entire keyboard (35% of the screen height)
      const keyboardHeight = viewportHeight * 0.35;
      const buttonRows = keys.length; // Total number of rows of buttons
      const buttonColumns = 3; // Max number of buttons in a row

      // Dynamically adjust button sizes and font size
      const buttonHeight = Math.floor((keyboardHeight - 60) / buttonRows); // Subtract padding
      const buttonWidth = Math.floor((viewportWidth - 60) / buttonColumns);
      const fontSize = Math.min(buttonHeight * 0.4, 24); // Font size relative to button height

      setKeyboardDimensions({
        buttonHeight: buttonHeight,
        buttonWidth: buttonWidth,
        fontSize: fontSize,
      });
    };

    if (isOpen) {
      calculateDimensions(); // Perform sizing calculations when the component is opened
      window.visualViewport?.addEventListener("resize", calculateDimensions); // Update on viewport resize
    }

    return () => {
      window.visualViewport?.removeEventListener("resize", calculateDimensions); // Cleanup listener
    };
  }, [isOpen, keys.length]);

  /**
   * Handles numeric key presses. Appends the clicked key to the current input.
   *
   * @param {string} key - The pressed key (0–9).
   */
  const handleKeyClick = (key) => {
    if (key) setInput((prev) => prev + key);
  };

  /**
   * Deletes the last character of the current input.
   */
  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1)); // Removes the last character
  };

  /**
   * Finalizes the input value and sends it to the parent component. Closes the keyboard.
   */
  const handleDone = () => {
    setBalanceField(input); // Send the input value to the parent
    setInput(""); // Clear the input field
    handleClose(); // Close the keyboard
  };

  return (
    <Drawer
      open={isOpen} // Controls whether the drawer is visible
      onClose={handleClose} // Triggered when the drawer is closed
      anchor="bottom" // Drawer opens from the bottom of the screen
      disableAutoFocus
      ModalProps={{ keepMounted: true }} // Ensures the drawer stays mounted
      PaperProps={{
        component: StyledDrawerPaper, // Styled wrapper component
        style: {
          "--drawer-height": `${
            (window.visualViewport?.height || window.innerHeight) * 0.5
          }px`, // 50% of viewport height
        },
      }}
    >
      {/* Input Display Section */}
      <BoxAmount sx={{ backgroundColor: "secondary.main", mb: 2 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {formatCurrency(input)} {/* Display formatted input value */}
        </Typography>
        {input && (
          <IconButton onClick={handleDelete} sx={{ color: "icon.white" }}>
            <BackspaceIcon /> {/* Deletes last character */}
          </IconButton>
        )}
      </BoxAmount>

      {/* Numeric Keys Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "grid",
          gap: 1,
          gridTemplateRows: `repeat(${keys.length}, 1fr)`,
        }}
      >
        {keys.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              gap: 1,
              gridTemplateColumns: `repeat(3, 1fr)`,
              justifyItems: "center",
              justifyContent: "center",
            }}
          >
            {row.map((key, index) => (
              <Button
                key={`${key}-${index}`}
                variant="contained"
                onClick={() => handleKeyClick(key)}
                sx={{
                  height: `${keyboardDimensions.buttonHeight}px`,
                  width: `${keyboardDimensions.buttonWidth}px`,
                  fontSize: `${keyboardDimensions.fontSize}px`,
                  backgroundColor: "icon.info",
                  borderRadius: "30px",
                }}
              >
                {key}
              </Button>
            ))}
          </Box>
        ))}
      </Box>

      {/* Action Buttons Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          color="error" // Cancel Button
          onClick={() => {
            setInput(""); // Clear input value
            handleClose(); // Close the keyboard
          }}
          sx={{
            py: 1.5,
            flex: 1,
            mx: 1,
            backgroundColor: "icon.red",
            borderRadius: "20px",
          }}
        >
          {t("cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={handleDone} // Done Button
          disabled={!input} // Disabled if no input is present
          sx={{
            py: 1.5,
            flex: 1,
            mx: 1,
            backgroundColor: "icon.accent",
            borderRadius: "20px",
          }}
        >
          {t("done")}
        </Button>
      </Box>
    </Drawer>
  );
};

NumericKeyboard.propTypes = {
  /**
   * Whether the numeric keyboard is open (visible) or not.
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Function to handle closing the numeric keyboard.
   */
  handleClose: PropTypes.func.isRequired,

  /**
   * Function to receive the numeric input value when the "Done" button is clicked.
   */
  setBalanceField: PropTypes.func.isRequired,
};

export default NumericKeyboard;
