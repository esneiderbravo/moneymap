import React, { useState } from "react";
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
import ManageAccountsContent from "./ManageAccountsContent";
import { ManageOptionsContainer } from "../../../styles/more/manage/ManageContent.styled";

/**
 * MoreManageContent Component
 *
 * This component provides navigation for account management options.
 * Users can select an option from the list, and the corresponding content
 * will be displayed dynamically.
 *
 * @returns {React.JSX.Element} The rendered MoreManageContent component.
 */
const ManageContent = () => {
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

      <ManageOptionsContainer item sx={{ backgroundColor: "primary.main" }}>
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
      </ManageOptionsContainer>

      {/* Selected Option Rendering */}
      {selectedOption === "accounts" ? (
        <ManageAccountsContent
          isOpen={selectedOption === "accounts"}
          setSelectedOption={setSelectedOption}
        />
      ) : null}
    </>
  );
};

export default ManageContent;
