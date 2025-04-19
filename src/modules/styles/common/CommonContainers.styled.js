import styled from "styled-components";
import { Grid2, Chip, Paper, Input, Button, FormControl } from "@mui/material";
import Select from "@mui/material/Select";

export const OptionsContainer = styled(Grid2)`
  border-radius: 28px 28px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 0 3px 0 10px;
`;

export const AccountInfo = styled(Grid2)`
  border-radius: 28px 28px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 0 3px 0 10px;
`;

export const PaperComponent = styled(Paper)`
  padding: 1px;
  border-radius: 24px !important;
  margin: 0 26px 26px;
  height: 46px;
`;

export const ChipComponent = styled(Chip)`
  flex: 1; // Allow chip to grow or shrink proportionally
  text-align: center;
  font-weight: bold;
  background-color: ${({ selected, background_color }) =>
    selected ? background_color || "#d3d9d4" : "transparent"} !important;
  color: ${({ text_color }) => text_color} !important;
  padding: 10px;
  height: 46px !important;
  font-size: 16px !important;
  overflow: hidden; // Prevent content from overflowing
  text-overflow: ellipsis; // Add ellipsis when text overflows
  white-space: nowrap; // Keep text on a single line
  cursor: pointer;
  box-sizing: border-box;

  // Responsive styling for smaller screens
  @media (max-width: 600px) {
    font-size: 14px; // Adjust font size
  }

  @media (max-width: 400px) {
    font-size: 12px; // Further reduce font size if the screen is narrower
  }
`;

export const SelectContainer = styled(Select)({
  color: "white !important",
  borderRadius: "8px",
  padding: "8px",
  "& .MuiSelect-icon": {
    display: "none",
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
});

export const InputContainer = styled(Input)`
  border-radius: 8px;
  padding: 8px;
`;

export const SubmitButtonContainer = styled(Button)`
  padding: 12px !important;
  font-size: 16px !important;
  border-radius: 8px !important;
  text-transform: none !important;
`;

export const SelectModal = styled(Select)({
  borderRadius: "8px",
  padding: "8px",
  "& .MuiSelect-icon": {
    display: "none",
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
});

export const SwitcherContainer = styled(FormControl)`
  margin: 5px !important;
  padding: 30px !important;
  display: flex;
  align-items: center;
  min-height: 15vh;
`;

export const SaveButton = styled(Button)`
  padding: 10px !important;
  margin: 20px !important;
  text-transform: none !important;
`;
