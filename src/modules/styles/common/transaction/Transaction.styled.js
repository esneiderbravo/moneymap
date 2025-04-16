import styled from "styled-components";
import {
  InputContainer,
  OptionsContainer,
  SelectContainer,
  SubmitButtonContainer,
} from "../CommonContainers.styled";
import { Box } from "@mui/material";

export const TransactionContainer = styled(OptionsContainer)`
  height: 100vh;
`;

export const TransactionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 6px;
`;

export const InputTransaction = styled(InputContainer)``;

export const SelectType = styled(SelectContainer)``;

export const SubmitButton = styled(SubmitButtonContainer)``;
