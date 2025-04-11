import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CommonHeader from "../../../common/CommonHeader";
import useSwipeClose from "../../../hooks/useSwipeClose";
import { useTranslation } from "react-i18next";
import { CategoriesOptionsContainer } from "../../../../styles/more/manage/categories/Categories.styled";
import PropTypes from "prop-types";
import { getIconComponent } from "../../../../utils/common/icon";
import {
  ChipComponent,
  PaperComponent,
} from "../../../../styles/common/CommonContainers.styled";
import { useAppContext } from "../../../../providers/AppProvider";

const Categories = ({ isOpen, setSelectedOption }) => {
  const { t } = useTranslation("categories");
  const { state } = useAppContext();
  const { categories } = state;
  const chipElements = ["expense", "income"];
  const [currentCategory, setCurrentCategory] = React.useState("expense");

  useSwipeClose({
    isOpen: isOpen,
    onClose: (event) => handleClose(event),
  });

  /**
   * Handles closing the drawer when triggered by user interaction.
   * @param {React.MouseEvent} event - The click event.
   */
  const handleClose = (event) => {
    event.stopPropagation();
    document.activeElement?.blur();
    setSelectedOption(null);
  };

  return (
    <>
      {/* Categories List */}
      <Drawer
        key="ListCategories"
        open={isOpen}
        onClose={handleClose}
        anchor="right"
        disableAutoFocus
        ModalProps={{ keepMounted: true }}
      >
        {/* Common Header */}
        <CommonHeader handleClose={handleClose} title={t("title")} />

        <PaperComponent sx={{ backgroundColor: "secondary.main" }}>
          <Box display="flex" justifyContent="space-between" gap={1}>
            {chipElements.map((option) => (
              <ChipComponent
                key={option}
                label={t(option)}
                onClick={() => setCurrentCategory(option)}
                selected={currentCategory}
                option={option}
              />
            ))}
          </Box>
        </PaperComponent>

        {/* Accounts */}
        <CategoriesOptionsContainer
          size={12}
          sx={{ backgroundColor: "secondary.main", height: "100vh" }}
          mt={5}
        >
          <Box component="nav">
            <List>
              {categories[currentCategory].map((category, index) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemButton sx={{ borderRadius: 2 }} onClick={() => {}}>
                      <ListItemIcon>
                        {IconComponent && (
                          <IconComponent sx={{ color: `${category.color}` }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={t(
                          `${category.type}_categories.${category.name}`
                        )}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </CategoriesOptionsContainer>
      </Drawer>
    </>
  );
};

Categories.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default Categories;
