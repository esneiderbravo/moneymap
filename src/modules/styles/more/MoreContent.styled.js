import styled from "styled-components";
import { Chip, Paper } from "@mui/material";
import { OptionsContainer } from "../common/CommonContainers.styled";

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

export const MoreOptionsContainer = styled(OptionsContainer)`
  border-radius: 28px 28px 28px 28px;
  margin: 0 5px 0 5px !important;
`;
