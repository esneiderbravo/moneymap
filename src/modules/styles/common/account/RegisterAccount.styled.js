import styled from "styled-components";
import {
  InputContainer,
  OptionsContainer,
  SelectContainer,
  SubmitButtonContainer,
} from "../CommonContainers.styled";
import { Box } from "@mui/material";

export const RegisterAccountContainer = styled(OptionsContainer)`
  padding: 40px;
  margin: 0 3px 0 -4px;
`;
export const RegisterBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 6px;
`;

export const InputRegister = styled(InputContainer)``;

export const SelectRegister = styled(SelectContainer)``;

export const SubmitButton = styled(SubmitButtonContainer)``;
