import styled from "styled-components";
import { OptionsContainer } from "../../../common/CommonContainers.styled";
import { Box, Button, Input } from "@mui/material";
import Select from "@mui/material/Select";

export const RegisterAccountContainer = styled(OptionsContainer)`
  height: 100vh;
  padding: 40px;
  margin: 0 5px 0 -1px;
`;
export const RegisterBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
`;

export const InputRegister = styled(Input)`
  color: white !important;
  border-radius: 8px;
  padding: 8px;
`;

export const SelectRegister = styled(Select)({
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

export const SubmitButton = styled(Button)`
  padding: 12px !important;
  font-size: 16px !important;
  border-radius: 8px !important;
  text-transform: none !important;
`;
