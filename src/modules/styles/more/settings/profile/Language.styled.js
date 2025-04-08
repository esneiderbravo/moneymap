import styled from "styled-components";
import Select from "@mui/material/Select";

export const SelectLanguage = styled(Select)({
  color: "white !important",
  borderRadius: "8px",
  padding: "8px",
  "& .MuiSelect-icon": {
    display: "none",
  },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
});
