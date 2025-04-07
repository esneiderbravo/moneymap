import styled from "styled-components";
import { Box, Grid2 } from "@mui/material";

export const AlertSection = styled(Grid2)`
  border-radius: 28px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 0 3px 0 5px;
  min-width: 180px !important;
  min-height: 140px !important;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  outline: none;

  &:active {
    transform: scale(0.97);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 165, 0, 0.6);
    border-radius: 28px;
  }
`;

export const StyledAlertBox = styled(Box)(() => ({
  display: "flex",
  overflowX: "auto",
  gap: 2,
  paddingTop: 10,
  paddingBottom: 10,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

export const AlertContainer = styled(Grid2)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 1,
}));
