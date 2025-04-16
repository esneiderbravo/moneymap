import styled from "styled-components";
import { Grid2, Chip, Paper, Input, Button } from "@mui/material";
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
  border-radius: 14px !important;
  margin: 0 26px 26px;
  height: 46px;
`;

export const ChipComponent = styled(Chip)`
  flex: 1;
  text-align: center;
  font-weight: bold;
  border: ${({ selected, option }) =>
    selected === option ? "2px solid #d3d9d4" : "0px"} !important;
  background-color: ${({ selected, option }) =>
    selected === option ? "#d3d9d4" : "transparent"} !important;
  color: ${({ selected, option }) =>
    selected === option ? "#124e66" : "#748d92"} !important;
  padding: 10px;
  height: 46px !important;
  font-size: 16px !important;
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
  color: white !important;
  border-radius: 8px;
  padding: 8px;
`;

export const SubmitButtonContainer = styled(Button)`
  padding: 12px !important;
  font-size: 16px !important;
  border-radius: 8px !important;
  text-transform: none !important;
`;
