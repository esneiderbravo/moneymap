import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledDrawerPaper = styled("div")`
  width: calc(100vw - 40px) !important;
  height: var(--drawer-height, 100%) !important; /* Dynamic height */
  border-radius: 16px 16px 0 0;
  padding: 20px !important;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between; /* Space between all components */
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
