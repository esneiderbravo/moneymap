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
import { ManageOptionsContainer } from "../../../styles/more/manage/ManageContent.styled";
import AccountsContent from "./account/AccountsContent";

const ManageContent = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const optionElements = [
    {
      name: "Accounts",
      icon: <AccountBalance />,
      color: "icon.white",
      onClick: () => handleOptionClick("accounts"),
    },
  ];

  return (
    <>
      {/* Always keep AccountsContent mounted, just toggle isOpen */}
      <AccountsContent
        key="ManageAccounts"
        isOpen={selectedOption === "accounts"}
        setSelectedOption={setSelectedOption}
      />

      <ManageOptionsContainer item sx={{ backgroundColor: "secondary.main" }}>
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
    </>
  );
};

export default ManageContent;
