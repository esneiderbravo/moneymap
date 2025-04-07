import styled from "styled-components";
import { AccountInfo } from "../CommonContainers.styled";
import getIconColor from "../../../utils/common/color";
import { Button, IconButton, ListItemButton } from "@mui/material";

export const AccountInfoContainer = styled(AccountInfo)`
  height: auto;
`;

export const AdjustBalanceButton = styled(Button)(({ custom_color }) => ({
  backgroundColor: `${custom_color} !important`,
  color: `${getIconColor(custom_color)} !important`,
  borderRadius: "15px !important",
  px: "4 !important",
  width: "100% !important",
  textTransform: "none !important",
}));

export const EditAccountContainer = styled(IconButton)(({ custom_color }) => ({
  backgroundColor: `${custom_color} !important`,
  borderRadius: "50% !important",
  width: "40 !important",
  height: "40 !important",
  display: "flex !important",
  alignItems: "center !important",
  justifyContent: "center !important",
  "&:hover": {
    backgroundColor: `${custom_color} !important`,
    opacity: "0.8 !important",
  },
}));

export const ListItemButtonAccountInfo = styled(ListItemButton)({
  minWidth: "max-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "5px",
});
