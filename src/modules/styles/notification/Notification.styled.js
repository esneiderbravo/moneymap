import styled from "styled-components";
import { Box } from "@mui/material";

export const BoxContent = styled(Box)`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 85%;

  @media (min-width: 600px) {
    width: 55%;
  }

  @media (min-width: 960px) {
    width: 40%;
  }
`;
