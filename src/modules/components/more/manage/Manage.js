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
import { ManageOptionsContainer } from "../../../styles/more/manage/Manage.styled";
import Accounts from "./accounts/Accounts";
import { useTranslation } from "react-i18next";
import { getIconComponent } from "../../../utils/common/icon";
import Categories from "./categories/Categories";

const Manage = () => {
  const { t } = useTranslation("manage");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Define icons
  const AccountBalanceIcon = getIconComponent("AccountBalance");
  const CategoryIcon = getIconComponent("Category");

  const optionElements = [
    {
      name: t("accounts"),
      icon: <AccountBalanceIcon />,
      color: "icon.white",
      onClick: () => handleOptionClick("accounts"),
    },
    {
      name: t("categories"),
      icon: <CategoryIcon />,
      color: "icon.white",
      onClick: () => handleOptionClick("categories"),
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
                  <ListItem disablePadding sx={{ mb: 2, mt: 2 }}>
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

      <Categories
        key="ManageCategories"
        isOpen={selectedOption === "categories"}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
};

export default Manage;
