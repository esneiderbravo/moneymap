import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/**
 * PickerColumn renders a scrollable vertical column of values.
 * It auto-scrolls to the selected value and triggers onChange when scrolled.
 */
const PickerColumn = ({ values, selected, onChange, transformValue }) => {
  const containerRef = useRef(null);
  const itemHeight = 36;

  useEffect(() => {
    const index = values.indexOf(selected);
    if (index !== -1 && containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, [values, selected]);

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        height: itemHeight * 3,
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        "&::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        scrollbarWidth: "none",
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch",
        borderRadius: 2,
        position: "relative",
      }}
      onScroll={(e) => {
        const scrollTop = e.currentTarget.scrollTop;
        const index = Math.round(scrollTop / itemHeight);
        onChange(values[index]);
      }}
    >
      {/* Visual indicator for center alignment */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "grey.500",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <ArrowDropDownIcon />
      </Box>

      <Box sx={{ py: 0 }}>
        {/* Top spacer */}
        <Box sx={{ height: itemHeight, scrollSnapAlign: "center" }} />
        {values.map((value, idx) => (
          <Box
            key={idx}
            sx={{
              height: itemHeight,
              scrollSnapAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: value === selected ? "white" : "grey.500",
              fontWeight: value === selected ? "bold" : "normal",
              fontSize: value === selected ? 18 : 16,
              userSelect: "none",
            }}
          >
            {transformValue ? transformValue(value) : value}
          </Box>
        ))}
        {/* Bottom spacer */}
        <Box sx={{ height: itemHeight, scrollSnapAlign: "center" }} />
      </Box>
    </Box>
  );
};

PickerColumn.propTypes = {
  values: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  transformValue: PropTypes.func,
};

/**
 * CustomDatePicker renders a dialog-based date selector.
 * Users can pick day, month, and year using scrollable columns.
 */
export default function CustomDatePicker({ open, handleClose, setDate }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // List of month numbers (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Full month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // List of years from current year back 100 years
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  /**
   * Returns a list of valid days for a given month and year.
   * @param {number} month - Month number (1-12)
   * @param {number} year - Full year (e.g., 2025)
   * @returns {number[]} Array of valid days (1-31 depending on month/year)
   */
  const daysInMonth = (month, year) => {
    const date = new Date(year, month, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

  const days = daysInMonth(selectedMonth, selectedYear);
  const transformMonth = (monthNumber) => monthNames[monthNumber - 1];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ color: "text.info", textAlign: "center" }}>
        Select a date
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            margin: "0 auto",
            color: "white",
          }}
        >
          <PickerColumn
            values={days}
            selected={selectedDay}
            onChange={setSelectedDay}
          />
          <PickerColumn
            values={months}
            selected={selectedMonth}
            onChange={setSelectedMonth}
            transformValue={transformMonth}
          />
          <PickerColumn
            values={years}
            selected={selectedYear}
            onChange={setSelectedYear}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          fullWidth
          variant="contained"
          color="error"
          sx={{ backgroundColor: "icon.info", borderRadius: "20px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            const monthNumber = selectedMonth.toString().padStart(2, "0");
            const formattedDate = `${selectedDay}/${monthNumber}/${selectedYear}`;
            setDate(formattedDate);
            handleClose();
          }}
          fullWidth
          sx={{ borderRadius: "20px" }}
          variant="contained"
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CustomDatePicker.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
};
