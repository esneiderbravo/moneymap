import styled from "styled-components";
import { Chip, Paper } from "@mui/material";

export const PaperComponent = styled(Paper)`
  padding: 1px;
  border-radius: 14px !important;
  margin: 0 46px;
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
`;
