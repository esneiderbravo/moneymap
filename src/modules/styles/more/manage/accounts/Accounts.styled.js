import styled from "styled-components";
import { OptionsContainer } from "../../../common/CommonContainers.styled";
import { ListItemButton } from "@mui/material";

export const AccountsOptionsContainer = styled(OptionsContainer)`
  height: auto;
`;

export const ListItemButtonCurrentBalance = styled(ListItemButton)({
  minWidth: "max-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "5px",
});

export const ListItemButtonTotalUntil = styled(ListItemButton)({
  minWidth: "max-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "2px",
});
