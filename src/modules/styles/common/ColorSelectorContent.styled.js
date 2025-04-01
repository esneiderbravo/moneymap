import styled from "styled-components";
import { Box, Typography } from "@mui/material";

export const ColorSectionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export const TooltipBox = styled(Box)`
  width: ${(props) => `${props.size}px` || "40px"};
  height: ${(props) => `${props.size}px` || "40px"};
  border-radius: 50%;
  background-color: ${(props) => props.color || "transparent"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }
`;

export const Title = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 1;
`;

export const QuickColorBox = styled(Box)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

export const PopOverBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 16px;
`;
