import React, { useState } from "react";
import { MoreOptionsContainer } from "../../styles/more/MoreContent.styled";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import MoreAccountsContent from "./MoreAccountsContent";

/**
 * MoreManageContent Component
 * Handles navigation between different account management options.
 *
 * @returns {React.JSX.Element} The rendered MoreManageContent component.
 */
const MoreManageContent = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  /**
   * Menu options with their respective icons and click handlers.
   */
  const optionElements = [
    {
      name: "Accounts",
      icon: <AccountBalance />,
      color: "icon.white",
      onClick: () => setSelectedOption("accounts"),
    },
  ];

  return (
    <>
      {/* Options Container */}
      {!selectedOption && (
        <MoreOptionsContainer item sx={{ backgroundColor: "primary.main" }}>
          <Box>
            <nav>
              <List>
                {optionElements.map((option) => (
                  <React.Fragment key={option.name}>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <ListItemButton
                        onClick={option.onClick}
                        aria-label={option.name}
                      >
                        <ListItemIcon sx={{ color: option.color }}>
                          {option.icon}
                        </ListItemIcon>
                        <ListItemText primary={option.name} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </nav>
          </Box>
        </MoreOptionsContainer>
      )}

      {/* Selected Option Rendering */}
      {selectedOption === "accounts" && (
        <MoreAccountsContent setSelectedOption={setSelectedOption} />
      )}
    </>
  );
};

export default MoreManageContent;
