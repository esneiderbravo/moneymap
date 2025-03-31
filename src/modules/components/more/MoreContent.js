import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  ChipComponent,
  PaperComponent,
} from "../../styles/more/MoreContent.styled";
import SettingsContent from "./SettingsContent";
import ManageContent from "./ManageContent";

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
      {moreCurrentPage === "Manage" ? <ManageContent /> : null}

      {/* SettingsContent */}
      <SettingsContent />
    </>
  );
};

/**
 * MoreContent propTypes
 */
MoreContent.propTypes = {};

export default MoreContent;
