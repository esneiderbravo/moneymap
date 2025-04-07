import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid2 } from "@mui/material";

const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["Del", "0", "OK"],
];

const NumericKeyboard = ({ onKeyPress }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        left: 0,
        width: "100%",
        backgroundColor: "background.paper",
        boxShadow: 4,
        zIndex: 1500,
        p: 1,
      }}
    >
      {keys.map((row, rowIndex) => (
        <Grid2 container key={rowIndex} spacing={1} justifyContent="center">
          {row.map((key) => (
            <Grid2 item xs={4} key={key}>
              <Button
                variant="contained"
                onClick={() => onKeyPress(key)}
                fullWidth
                sx={{ fontSize: "1.5rem", py: 2 }}
              >
                {key}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      ))}
    </Box>
  );
};

NumericKeyboard.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
};

export default NumericKeyboard;
