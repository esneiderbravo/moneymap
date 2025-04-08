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
import { ManageOptionsContainer } from "../../../styles/more/manage/Manage.styled";
import Accounts from "./accounts/Accounts";
import { useTranslation } from "react-i18next";

const Manage = () => {
  const { t } = useTranslation("manage");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const optionElements = [
    {
      name: t("accounts"),
      icon: <AccountBalance />,
      color: "icon.white",
      onClick: () => handleOptionClick("accounts"),
    },
  ];

  return (
    <>
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

      {/* Always keep AccountsContent mounted, just toggle isOpen */}
      <Accounts
        key="ManageAccounts"
        isOpen={selectedOption === "accounts"}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
};

export default Manage;
