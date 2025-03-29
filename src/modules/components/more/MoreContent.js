import React from "react";
import { Box } from "@mui/material";
import { useAppContext } from "../../providers/AppProvider";
import {
  ChipComponent,
  PaperComponent,
} from "../../styles/more/MoreContent.styled";
import { setMoreCurrentPage } from "../../actions/state";
import LocalStorage from "../../utils/localStorage";
import SettingsContent from "./SettingsContent";

/**
 * MoreContent Component
 * Displays additional settings and options, including a logout button.
 *
 * @returns {React.JSX.Element} A section with selectable options and a logout button.
 */
const MoreContent = () => {
  const { state, dispatch } = useAppContext();
  const { moreCurrentPage } = state;
  const elements = ["Manage", "Follow", "About"];

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
      <SettingsContent />
    </>
  );
};

/**
 * MoreContent propTypes
 */
MoreContent.propTypes = {};

export default MoreContent;
