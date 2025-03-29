import React from "react";
import { Button, Grid2, Box } from "@mui/material";
import { useAppContext } from "../../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import {
  ChipComponent,
  PaperComponent,
} from "../../styles/more/MoreContent.styled";
import { setMoreCurrentPage } from "../../actions/state";
import LocalStorage from "../../utils/localStorage";

/**
 * MoreContent Component
 * Displays additional settings and options, including a logout button.
 *
 * @returns {React.JSX.Element} A section with selectable options and a logout button.
 */
const MoreContent = () => {
  const { language, state, dispatch } = useAppContext();
  const { moreCurrentPage } = state;
  const navigate = useNavigate();
  const elements = ["Manage", "Follow", "About"];

  /**
   * Handles logout by navigating to the logout page.
   */
  const handleLogout = () => {
    navigate("/logout");
  };

  /**
   * Handles selecting a chip option.
   * @param {string} option - The selected option.
   */
  const handleSelect = (option) => {
    dispatch(setMoreCurrentPage(option));
    LocalStorage.setItem("moreCurrentPage", option);
  };

  return (
    <>
      <PaperComponent>
        <Box display="flex" justifyContent="space-between" gap={1}>
          {elements.map((option) => (
            <ChipComponent
              key={option}
              label={option}
              onClick={() => handleSelect(option)}
              selected={moreCurrentPage}
              option={option}
            />
          ))}
        </Box>
      </PaperComponent>
      <Grid2 item xs={12} display="flex" justifyContent="center" marginTop={2}>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          {language?.dashboard?.logoutButtonText || "Logout"}
        </Button>
      </Grid2>
    </>
  );
};

/**
 * MoreContent propTypes
 */
MoreContent.propTypes = {};

export default MoreContent;
