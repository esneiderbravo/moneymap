import styled from "styled-components";
import { Grid2 } from "@mui/material";

export const BalanceSection = styled(Grid2)`
  border-radius: 0 0 28px 28px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: inherit;
  padding: 30px;
  margin: 0 3px 0 5px;
`;

export const IncomeSection = styled(Grid2)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IncomeIconSection = styled(Grid2)`
  border-radius: 50%;
  background-color: green;
  width: 40px !important;
  height: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExpenseSection = styled(Grid2)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ExpenseIconSection = styled(Grid2)`
  border-radius: 50%;
  background-color: red;
  width: 40px !important;
  height: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
