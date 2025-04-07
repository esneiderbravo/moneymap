import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  ChipComponent,
  PaperComponent,
} from "../../styles/more/MoreContent.styled";
import Settings from "./settings/Settings";
import Manage from "./manage/Manage";
import CommonHeader from "../common/CommonHeader";

/**
 * MoreContent Component
 * Displays additional settings and options, including a logout button.
 *
 * @returns {React.JSX.Element} A section with selectable options and a logout button.
 */
const More = () => {
  const [moreCurrentPage, setMoreCurrentPage] = useState("Manage");
  const chipElements = ["Manage", "Follow", "About"];

  return (
    <>
      {/* Common Header */}
      <CommonHeader
        handleClose={() => {}}
        title={"More Options"}
        showSettings={true}
      />

      {/* ChipContent */}
      <PaperComponent sx={{ backgroundColor: "secondary.main" }}>
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
      {moreCurrentPage === "Manage" ? <Manage /> : null}

      {/* SettingsContent */}
      <Settings />
    </>
  );
};

/**
 * MoreContent propTypes
 */
More.propTypes = {};

export default More;
