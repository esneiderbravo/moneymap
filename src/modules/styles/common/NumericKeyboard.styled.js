import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledDrawerPaper = styled("div")`
  width: calc(100vw - 40px) !important;
  height: 50vh !important;
  border-radius: 16px 16px 0 0;
  padding: 20px !important;
`;

export const BoxAmount = styled(Box)(() => ({
  marginBottom: "30px !important",
  padding: "10px !important",
  textAlign: "center !important",
  borderRadius: "20px !important",
  display: "flex !important",
  justifyContent: "center !important",
  alignItems: "center !important",
}));
