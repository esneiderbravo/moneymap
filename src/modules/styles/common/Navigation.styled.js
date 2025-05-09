import styled from "styled-components";
import { BottomNavigation, Paper } from "@mui/material";

export const PaperContainer = styled(Paper)`
  border-radius: 28px 28px 0 0 !important;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 9%;
`;

export const BottomNavigationContent = styled(BottomNavigation)`
  border-radius: 28px 28px 0 0 !important;
  height: 100% !important;
`;

export const SpeedDialWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1500;
`;
