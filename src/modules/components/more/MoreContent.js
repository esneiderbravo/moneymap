import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  ChipComponent,
  PaperComponent,
} from "../../styles/more/MoreContent.styled";
import MoreSettingsContent from "./MoreSettingsContent";
import MoreManageContent from "./MoreManageContent";

/**
 * MoreContent Component
 * Displays additional settings and options, including a logout button.
 *
 * @returns {React.JSX.Element} A section with selectable options and a logout button.
 */
const MoreContent = () => {
  const [moreCurrentPage, setMoreCurrentPage] = useState("Manage");
  const chipElements = ["Manage", "Follow", "About"];

  return (
    <>
      {/* ChipContent */}
      <PaperComponent>
        <Box display="flex" justifyContent="space-between" gap={1}>
          {chipElements.map((option) => (
            <ChipComponent
              key={option}
              label={option}
              onClick={() => setMoreCurrentPage(option)}
              selected={moreCurrentPage}
              option={option}
            />
          ))}
        </Box>
      </PaperComponent>

      {/* SettingsContent */}
      {moreCurrentPage === "Manage" ? <MoreManageContent /> : null}

      {/* SettingsContent */}
      <MoreSettingsContent />
    </>
  );
};

/**
 * MoreContent propTypes
 */
MoreContent.propTypes = {};

export default MoreContent;
