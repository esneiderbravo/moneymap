import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Settings from "./settings/Settings";
import Manage from "./manage/Manage";
import CommonHeader from "../common/CommonHeader";
import { useTranslation } from "react-i18next";
import {
  ChipComponent,
  PaperComponent,
} from "../../styles/common/CommonContainers.styled";

/**
 * MoreContent Component
 * Displays additional settings and options, including a logout button.
 *
 * @returns {React.JSX.Element} A section with selectable options and a logout button.
 */
const More = () => {
  const { t } = useTranslation("more");
  const [moreCurrentPage, setMoreCurrentPage] = useState("manage");
  const chipElements = ["manage", "follow", "about"];
  const theme = useTheme();

  return (
    <>
      {/* Common Header */}
      <CommonHeader
        handleClose={() => {}}
        title={t("title")}
        showSettings={true}
      />

      {/* ChipContent */}
      <PaperComponent
        sx={{ backgroundColor: "secondary.main", padding: "16px" }}
      >
        <Box
          display="flex"
          flexWrap="wrap" // Enable chips to wrap on smaller screens
          justifyContent="center" // Center align chips on smaller screens
          gap={2} // Spacing between chips
        >
          {chipElements.map((option) => (
            <ChipComponent
              key={option}
              label={t(option)}
              onClick={() => setMoreCurrentPage(option)}
              selected={moreCurrentPage === option}
              background_color={theme.palette.accent.main}
              text_color={
                moreCurrentPage === option
                  ? theme.palette.text.primary
                  : theme.palette.text.info
              }
            />
          ))}
        </Box>
      </PaperComponent>

      {/* SettingsContent */}
      {moreCurrentPage === "manage" ? <Manage /> : null}

      <Settings />
    </>
  );
};

/**
 * MoreContent propTypes
 */
More.propTypes = {};

export default More;
